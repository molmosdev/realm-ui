import { Component, contentChildren, effect, HostListener, model, OnInit, output, signal } from '@angular/core';
import { Tab } from './components/tab/tab.component';

@Component({
  selector: 'r-tabs',
  standalone: true,
  imports: [],
  templateUrl: './tabs.component.html',
})
export class Tabs implements OnInit {
  tabs = contentChildren(Tab);
  selectedIndex = signal<number>(-1);
  selectedValue = model<string | null>(null);
  highlightedIndex = signal<number>(-1);
  onChanges = output<string>();
  lastSelectedValue: string | null = null;

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

  /**
   * Handle the selection of a tab.
   */
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

  /**
   * Select a tab.
   * @param {Tab} tab - The tab to select.
   * @param {number} index - The index of the tab.
   */
  selectTab(tab: Tab, index: number): void {
    this.selectedValue.set(tab.value());
    this.lastSelectedValue = tab.value();
    this.selectedIndex.set(index);
  }

  /**
   * Highlight a tab.
   * @param {number} index - The index of the tab to highlight.
   */
  highlightTab(index: number) {
    this.highlightedIndex.set(index);
  }

  /**
   * Handle the states of the tabs.
   */
  handleTabStates(): void {
    this.tabs().forEach((tab, index) => {
      tab.selected.set(index === this.selectedIndex());
      tab.highlighted.set(index === this.highlightedIndex());
    });
  }

  /**
   * Handle the external selected value.
   */
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

  /**
   * Scroll to the selected tab.
   */
  handleScrollToSelectedTab() {
    if (this.selectedIndex() !== -1) {
      this.scrollToTab(this.selectedIndex(), 'smooth');
    }
  }

  /**
   * Angular lifecycle hook that is called after data-bound properties are initialized.
   */
  ngOnInit() {
    this.tabs()[0].selected.set(true);
  }

  /**
   * Handle keyboard events for navigation and selection.
   * @param {KeyboardEvent} event - The keyboard event.
   */
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

  /**
   * Focus on the next or previous tab.
   * @param {'next' | 'previous'} direction - The direction to move the focus.
   */
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

  /**
   * Select the currently focused tab.
   */
  selectFocusedTab() {
    this.selectTab(this.tabs()[this.highlightedIndex()], this.highlightedIndex());
    this.handleTabStates();
  }

  /**
   * Scroll to a specific tab.
   * @param {number} index - The index of the tab to scroll to.
   * @param {string} behavior - The scroll behavior ('instant' or 'smooth').
   */
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
