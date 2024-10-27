import { Component, contentChildren, effect, HostListener, model, OnInit, output, signal } from '@angular/core';
import { Tab } from './components/tab/tab.component';

@Component({
  selector: 'r-tabs',
  standalone: true,
  imports: [],
  templateUrl: './tabs.component.html',
})
export class Tabs implements OnInit {
  /** QueryList of Tab instances */
  tabs = contentChildren(Tab);

  /** Signal for the selected option index */
  selectedIndex = signal<number>(-1);

  /** Signal for the selected option value */
  selectedValue = model<string | null>(null);

  /** Last selected option value */
  lastSelectedValue: string | null = null;

  /** Signal to manage the highlighted option index */
  highlightedIndex = signal<number>(-1);

  /** Output event for changes */
  onChanges = output<string>();

  constructor() {
    effect(
      () => {
        this.handleTabSelection();
        this.handleExternalSelectedValue();
        this.handleScrollToSelectedTab();
      },
      {
        allowSignalWrites: true,
      }
    );
  }

  handleTabSelection(): void {
    this.tabs().forEach((tab, index) => {
      tab.select.subscribe(tabEmitted => {
        this.selectTab(tabEmitted, index);
        this.highlightTab(index);
        this.handleTabStates();
        this.onChanges.emit(tab.value());
      });
    });
  }

  selectTab(tab: Tab, index: number): void {
    this.selectedValue.set(tab.value());
    this.lastSelectedValue = tab.value();
    this.selectedIndex.set(index);
  }

  highlightTab(index: number) {
    this.highlightedIndex.set(index);
  }

  handleTabStates(): void {
    this.tabs().forEach((tab, index) => {
      tab.selected.set(index === this.selectedIndex());
      tab.highlighted.set(index === this.highlightedIndex());
    });
  }

  handleExternalSelectedValue(): void {
    if (this.lastSelectedValue !== this.selectedValue()) {
      const selectedOptionIndex = this.tabs().findIndex(tab => tab.value() === this.selectedValue());
      if (selectedOptionIndex !== -1) {
        this.selectTab(this.tabs()[selectedOptionIndex], selectedOptionIndex);
        this.highlightTab(selectedOptionIndex);
        this.handleTabStates();
      }
    }
  }

  handleScrollToSelectedTab() {
    if (this.selectedIndex() !== -1) {
      this.scrollToTab(this.selectedIndex(), 'smooth');
    }
  }

  ngOnInit() {
    this.tabs()[0].selected.set(true);
  }

  @HostListener('keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault();
        this.focusOption('next');
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.focusOption('previous');
        break;
      case 'Enter':
        event.preventDefault();
        this.selectFocusedTab();
        break;
    }
  }

  focusOption(direction: 'next' | 'previous') {
    let index = this.highlightedIndex();
    const increment = direction === 'next' ? 1 : -1;

    index += increment;
    while (index >= 0 && index < this.tabs().length && this.tabs()[index].disabled()) {
      index += increment;
    }

    if (index >= 0 && index < this.tabs().length) {
      this.highlightTab(index);
      this.handleTabStates();
      this.scrollToTab(this.highlightedIndex(), 'smooth');
    }
  }

  selectFocusedTab() {
    this.selectTab(this.tabs()[this.highlightedIndex()], this.highlightedIndex());
    this.handleTabStates();
  }

  scrollToTab(index: number, behavior: string): void {
    const tabsElements = this.tabs();
    if (tabsElements[index].el.nativeElement) {
      tabsElements[index].el.nativeElement.scrollIntoView({
        block: 'nearest',
        behavior: behavior,
      });
    }
  }
}
