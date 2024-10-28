import {
  Component,
  contentChildren,
  effect,
  ElementRef,
  HostListener,
  input,
  model,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { Option } from '../../../shared/components/option/option.component';
import { OptionsPositioningEnum } from '../../../shared/enums/options-positioning.enum';
import { NgClass, NgStyle } from '@angular/common';
import { Text } from '../text/text.component';
import { UtilsService } from '../../../shared/services/utils.service';
import { fadeInOutTrigger } from '../../../shared/animations/animations';

@Component({
  selector: 'r-search',
  standalone: true,
  imports: [NgClass, NgStyle, Text],
  templateUrl: './search.component.html',
  animations: [fadeInOutTrigger],
})
export class Search {
  /** Signal for the label of the select */
  label = input<string | undefined>(undefined);

  /** Signal for the error state of the select */
  error = input<boolean>(false);

  /** Signal to control if the dropdown is open or closed */
  isOpen = signal(false);

  /** Signal for the selected option value */
  selectedValue = model<string | null>(null);

  /** Signal for the selected option index */
  selectedIndex = signal<number>(-1);

  /** Signal for the selected option content */
  selectedContent = signal<string | null>(null);

  /** Signal to manage the highlighted option index */
  highlightedIndex = signal<number>(-1);

  /** QueryList of SelectOption2Component instances */
  options = contentChildren(Option);

  /** Reference to the options wrapper element */
  optionsWrapper = viewChild<ElementRef>('optionsWrapper');

  /** Last selected option value */
  lastSelectedValue: string | null = null;

  /** Maximum height of the options wrapper */
  optionsMaxHeight = input<number>(200);

  /** Output event for changes */
  onChanges = output<string | null>();

  /* Signal for the positioning of the options */
  positioning = input<OptionsPositioningEnum>(OptionsPositioningEnum.Down);

  /** Output event for text changes */
  onTextChanges = output<string | null>();

  /** Input for set the dobounce delay */
  debounceDelay = input<number>(400);

  /** Signal for the no results message */
  noResultsMessage = input<string>('No results found');

  /** Signal for the searching state */
  searching = input<boolean>(false);

  /** Signal for the search query */
  query = model<string | null>(null);

  constructor(
    private elementRef: ElementRef,
    private utilsService: UtilsService
  ) {
    effect(
      () => {
        if (this.optionsWrapper()) {
          this.handleScrollToSelectedOptionOnOpen();
          this.handleOptionSelection();
        }
        this.handleExternalSelectedValue();
      },
      {
        allowSignalWrites: true,
      }
    );
  }

  handleScrollToSelectedOptionOnOpen() {
    if (this.selectedIndex() !== -1) {
      this.scrollToOption(this.selectedIndex(), 'instant');
    }
  }

  scrollToOption(index: number, behavior: string): void {
    const optionElements = this.options();
    if (optionElements[index]) {
      optionElements[index].el.nativeElement.scrollIntoView({
        block: 'nearest',
        behavior: behavior,
      });
    }
  }

  handleOptionSelection(): void {
    this.options().forEach((option, index) => {
      option.select.subscribe(optionEmitted => {
        this.selectOption(optionEmitted, index);
        this.highlightOption(index);
        this.handleOptionsStates();
        this.isOpen.set(false);
      });
    });
  }

  selectOption(option: Option, index: number): void {
    this.utilsService.stopDebounce();
    this.selectedValue.set(option.value());
    this.lastSelectedValue = option.value();
    this.selectedContent.set(option.el.nativeElement.innerText.trim());
    this.selectedIndex.set(index);
    this.onChanges.emit(option.value());
  }

  highlightOption(index: number) {
    this.highlightedIndex.set(index);
  }

  handleOptionsStates(): void {
    this.options().forEach((option, index) => {
      option.selected.set(index === this.selectedIndex());
      option.highlighted.set(index === this.highlightedIndex());
    });
  }

  handleExternalSelectedValue(): void {
    if (this.lastSelectedValue !== this.selectedValue()) {
      if (this.selectedValue()) {
        const selectedOptionIndex = this.options().findIndex(option => option.value() === this.selectedValue());
        if (selectedOptionIndex !== -1) {
          this.selectOption(this.options()[selectedOptionIndex], selectedOptionIndex);
          this.highlightOption(selectedOptionIndex);
          this.handleOptionsStates();
        }
      } else {
        this.selectedValue.set(null);
        this.lastSelectedValue = null;
        this.selectedContent.set(null);
        this.selectedIndex.set(-1);
        this.onChanges.emit(null);
        this.highlightOption(-1);
        this.handleOptionsStates();
      }
    }
  }

  @HostListener('keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.focusOption('next');
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusOption('previous');
        break;
      case 'Enter':
        event.preventDefault();
        this.isOpen() ? this.selectFocusedOption() : this.isOpen.set(true);
        break;
      case 'Escape':
        event.preventDefault();
        this.isOpen.set(false);
        break;
    }
  }

  focusOption(direction: 'next' | 'previous') {
    let index = this.highlightedIndex();
    const increment = direction === 'next' ? 1 : -1;

    index += increment;
    while (index >= 0 && index < this.options().length && this.options()[index].disabled()) {
      index += increment;
    }

    if (index >= 0 && index < this.options().length) {
      this.highlightOption(index);
      this.handleOptionsStates();
      this.scrollToOption(this.highlightedIndex(), 'smooth');
    }
  }

  selectFocusedOption() {
    this.selectOption(this.options()[this.highlightedIndex()], this.highlightedIndex());
    this.handleOptionsStates();
    this.isOpen.set(false);
  }

  @HostListener('focus')
  handleFocus(): void {
    this.isOpen.set(true);
  }

  @HostListener('blur')
  handleBlur(): void {
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  clearSelection($event: any): void {
    this.selectedIndex.set(-1);
    this.selectedValue.set(null);
    this.selectedContent.set(null);
    this.highlightedIndex.set(-1);
    this.isOpen.set(false);
    this.query.set(null);
    this.handleOptionsStates();
    $event.stopPropagation();
  }

  handleTextChanges(textContent: string | null): void {
    if (textContent) {
      this.utilsService.debounce(() => {
        this.onTextChanges.emit(textContent);
        this.isOpen.set(true);
      }, this.debounceDelay());
    } else {
      this.utilsService.stopDebounce();
      this.onTextChanges.emit(null);
      this.isOpen.set(false);
    }
  }
}
