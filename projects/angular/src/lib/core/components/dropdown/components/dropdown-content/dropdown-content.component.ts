import { Component, contentChild, ElementRef, HostListener, input, output, signal, viewChild } from '@angular/core';
import { NgStyle, NgTemplateOutlet } from '@angular/common';
import { fadeInOutTrigger } from '../../../../../shared/animations/animations';
import { LazyContentDirective } from '../../../../../shared/directives/lazy-content.directive';

@Component({
  selector: 'r-dropdown-content',
  standalone: true,
  imports: [NgTemplateOutlet, NgStyle],
  templateUrl: './dropdown-content.component.html',
  styleUrl: './dropdown-content.component.scss',
  animations: [fadeInOutTrigger],
})
export class DropdownContent {
  positioning = input<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>('bottom-left');
  width = input<number>(210);
  isDropdownContentVisible = signal<boolean>(false);
  lazyContent = contentChild(LazyContentDirective);
  dropdown = viewChild<ElementRef>('dropdown');
  forcePopover = input<boolean>(false);
  closeEmitter = output<void>();
  triggerRect: DOMRect | undefined = undefined;

  /**
   * Listen for keyboard escape events
   */
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.closeEmitter.emit();
      event.preventDefault();
    }
  }

  /**
   * Set trigger rect
   *
   * @param {DOMRect} rect
   */
  setTriggerRect(rect: DOMRect): void {
    this.triggerRect = rect;
    this.setDropdownPositioning();
  }

  /**
   * Set dropdown content position based on the trigger position
   */
  setDropdownPositioning(): void {
    let dropdownNativeElement = this.dropdown()?.nativeElement;
    if (this.triggerRect && dropdownNativeElement) {
      if (window.innerWidth <= 600 || this.forcePopover()) {
        dropdownNativeElement.style.top = '50%';
        dropdownNativeElement.style.left = '50%';
        dropdownNativeElement.style.transform = 'translate(-50%, -50%)';
      } else {
        const dropdownRect = dropdownNativeElement.getBoundingClientRect();

        const rightAlign = this.triggerRect.left;
        const leftAlign = this.triggerRect.left + this.triggerRect.width - dropdownRect.width;
        const topAlign = this.triggerRect.top - dropdownRect.height - 5;
        const bottomAlign = this.triggerRect.top + this.triggerRect.height + 5;

        let top: number;
        let left: number;

        switch (this.positioning()) {
          case 'top-left':
            top = topAlign;
            left = leftAlign;
            break;
          case 'top-right':
            top = topAlign;
            left = rightAlign;
            break;
          case 'bottom-left':
            top = bottomAlign;
            left = leftAlign;
            break;
          case 'bottom-right':
            top = bottomAlign;
            left = rightAlign;
            break;
        }

        if (left < 0) {
          left = this.triggerRect.left;
        }

        if (left + dropdownRect.width > window.innerWidth) {
          left = this.triggerRect.left + this.triggerRect.width - dropdownRect.width;
        }

        if (top + dropdownRect.height > window.innerHeight) {
          top = this.triggerRect.top - dropdownRect.height - 5;
        }

        if (top < 0) {
          top = this.triggerRect.top + this.triggerRect.height + 5;
        }

        dropdownNativeElement.style.top = `${top}px`;
        dropdownNativeElement.style.left = `${left}px`;
        dropdownNativeElement.style.transform = 'none';
      }
    }
  }
}
