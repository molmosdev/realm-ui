import { Component, contentChild, HostListener, model } from '@angular/core';
import { fadeInOutAnimation, fadeInOutZoomAnimation } from '../../../shared/animations/animations';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { LazyContentDirective } from '../../../shared/directives/lazy-content.directive';

@Component({
  selector: 'r-dialog',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NgClass
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  animations: [
    fadeInOutZoomAnimation,
    fadeInOutAnimation
  ]
})
export class Dialog {
  /* Signals*/
  show = model.required<boolean>();
  lazyContent = contentChild(LazyContentDirective);
  clickOutside = model<boolean>(true);

  /**
   * Listen for keyboard escape events
   */
  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.show.set(false);
      event.preventDefault();
    }
  }

  /**
   * Close the dialog
   */
  close(): void {
    if (this.clickOutside()) {
      this.show.set(false);
    }
  }
}
