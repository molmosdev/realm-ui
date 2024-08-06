import {
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  input,
  InputSignal,
  model,
  ModelSignal,
  OnDestroy,
  Signal,
  signal,
  viewChild,
  WritableSignal
} from '@angular/core';
import { fadeInOutAnimation, fadeInOutVerticalTrigger } from '../../animations/animations';
import { NgClass, NgStyle } from '@angular/common';
import { OptionsPositioningEnum } from './enums/options-positioning.enum';
import { SelectOption } from './components/select-option/select-option.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'r-select-options',
  standalone: true,
  templateUrl: './select-options.component.html',
  styleUrls: ['./select-options.component.scss'],
  imports: [
    NgStyle,
    NgClass,
    SelectOption
  ],
  animations: [
    fadeInOutAnimation,
    fadeInOutVerticalTrigger
  ]
})
export class SelectOptions implements OnDestroy {
  trigger: InputSignal<ElementRef> = input.required<ElementRef>();
  selectedId: ModelSignal<string | null> = model.required<string | null>();
  selectedValue: ModelSignal<string | null> = model<string | null>(null);
  positioning: InputSignal<OptionsPositioningEnum> = input<OptionsPositioningEnum>(OptionsPositioningEnum.Down);
  show: ModelSignal<boolean> = model.required<boolean>();
  height: InputSignal<number> = input<number>(200);
  optionsContainer: Signal<ElementRef | undefined> = viewChild<ElementRef>('optionsContainer');
  focusedOptionIndex: WritableSignal<number> = signal<number>(0);
  usingKeyboard: ModelSignal<boolean> = model(false);
  firstLoad: WritableSignal<boolean> = signal(true);
  options: InputSignal<readonly SelectOption[]> = input<readonly SelectOption[]>([]);
  noOptions: Signal<boolean> = computed(() => this.options().length === 0);
  noOptionsText: InputSignal<string> = input<string>('No options available');
  width: InputSignal<number | undefined> = input<number | undefined>(undefined);
  subscriptions: Subscription = new Subscription();

  constructor() {
    this.setOptionsPositioning();
    effect(() => {
      if (this.show()) {
        this.handleSelectedOption();
        this.handleFocusedOption(this.firstLoad());
        this.scrollToFocusedOption(this.firstLoad())
        this.setOptionsPositioning();
      }
    }, {
      allowSignalWrites: true
    });
  }

  /**
   * Get the positioning params
   *
   * @returns {Object} - The positioning params
   */
  get positioningParams(): {} {
    let optionsHeight = this.options().length * 40 > 216 ? 216 : this.options().length * 40;
    const triggerNativeElement = this.trigger()?.nativeElement;
    const topSpace = triggerNativeElement.getBoundingClientRect().top - optionsHeight;
    const bottomSpace = window.innerHeight - (triggerNativeElement.getBoundingClientRect().top + triggerNativeElement.getBoundingClientRect().height + optionsHeight);
    let isContrary = this.positioning() === OptionsPositioningEnum.Down && bottomSpace < 0 || this.positioning() === OptionsPositioningEnum.Up && topSpace < 0;

    let translateFrom = this.positioning() === OptionsPositioningEnum.Down
      ? !isContrary ? 'translateY(-5px)' : 'translateY(5px)'
      : !isContrary ? 'translateY(5px)' : 'translateY(-5px)';

    return {
      value: '',
      params: {
        translateFrom: translateFrom,
        translateTo: 'translateY(0)'
      }
    };
  }

  /**
   * Handle the selected option
   */
  handleSelectedOption(): void {
    let subs;
    this.options().forEach(option => {
      option.selected = this.selectedId() === option.id();
      subs = option.selectEmitter.subscribe(() => {
        if (typeof option.optionId !== 'undefined' && this.selectedId() !== option.optionId) {
          this.selectedId.set(option.optionId);
          this.selectedValue.set(option.value());
        }
      });
      this.subscriptions.add(subs);
    })
  }

  /**
   * Handle the focused option
   *
   * @param {boolean} firstLoad
   */
  handleFocusedOption(firstLoad: boolean = false): void {
    if (firstLoad) {
      this.focusedOptionIndex.set(this.options().findIndex(option => option.selected));
    } else {
      let subs;
      this.options().forEach((
        option,
        index
      ) => {
        option.focused = this.focusedOptionIndex() === index;
        subs = option.focusedEmitter.subscribe(() => {
          this.focusedOptionIndex.set(index);
        });
      });
      this.subscriptions.add(subs);
    }
  }

  @HostListener('document:keydown.arrowdown', ['$event'])
  @HostListener('document:keydown.arrowup', ['$event'])
  @HostListener('document:keydown.enter', ['$event'])
  @HostListener('document:keydown.escape', ['$event'])
  onArrowKeydownHandler(event: KeyboardEvent) {
    this.usingKeyboard.set(true);
    const options = this.options();
    options.forEach(option => option.usingKeyboard = true);
    const currentIndex = this.focusedOptionIndex();

    if (event.key === 'ArrowDown') {
      const nextIndex = currentIndex + 1;
      if (nextIndex < options.length) {
        this.focusedOptionIndex.set(nextIndex);
        this.options().find((
          option,
          index
        ) => {
          if (index === nextIndex) {
            option.focused = true;
          }
        });
        this.scrollToFocusedOption();
      }
    } else if (event.key === 'ArrowUp') {
      const prevIndex = currentIndex - 1;
      if (prevIndex >= 0) {
        this.focusedOptionIndex.set(prevIndex);
        this.options().find((
          option,
          index
        ) => {
          if (index === prevIndex) {
            option.focused = true;
          }
        });
        this.scrollToFocusedOption();
      }
    } else if (event.key === 'Enter') {
      const focusedOptionId = this.options()[currentIndex].id();
      if (typeof focusedOptionId !== 'undefined') {
        this.selectedId.set(focusedOptionId);
        this.selectedValue.set(this.options()[currentIndex].value());
      }
      this.show.set(false);
      event.preventDefault();
    } else if (event.key === 'Escape') {
      this.show.set(false);
      event.preventDefault();
    }
  }

  /**
   * Set the options positioning
   */
  setOptionsPositioning(): void {
    if (!this.optionsContainer()?.nativeElement || !this.trigger()?.nativeElement) {
      return;
    }

    const optionsHeight = this.options().length * 40 > 216 ? 216 : this.options().length * 40;
    const optionsNativeElement = this.optionsContainer()?.nativeElement;
    const triggerNativeElement = this.trigger()?.nativeElement;
    const bottomSpace = window.innerHeight - (triggerNativeElement.getBoundingClientRect().top + triggerNativeElement.getBoundingClientRect().height + optionsHeight);
    const topSpace = triggerNativeElement.getBoundingClientRect().top - optionsHeight;

    if ((this.positioning() === OptionsPositioningEnum.Down && bottomSpace < 0) || (this.positioning() === OptionsPositioningEnum.Up && topSpace > 0)) {
      optionsNativeElement.style.top = 'auto';
      optionsNativeElement.style.bottom = 'calc(100% + 5px)';
    } else {
      optionsNativeElement.style.top = 'calc(100% + 5px)';
      optionsNativeElement.style.bottom = 'auto';
    }
  }

  /**
   * Unsubscribe from all subscriptions
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /**
   * Scroll to the focused option element in the options container
   */
  private scrollToFocusedOption(firstLoad = false): void {
    if (!this.usingKeyboard() && !firstLoad) {
      return;
    }
    const focusedOptionIndex = this.focusedOptionIndex();
    const optionsContainerElement = this.optionsContainer()?.nativeElement;
    const optionElement = optionsContainerElement?.children[focusedOptionIndex];

    if (optionElement) {
      optionElement.scrollIntoView({ block: 'nearest' });
    }
    this.firstLoad.set(false);
  }
}
