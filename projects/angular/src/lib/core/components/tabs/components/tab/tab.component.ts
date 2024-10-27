import { NgClass } from '@angular/common';
import { Component, ElementRef, input, output, signal } from '@angular/core';

@Component({
  selector: 'r-tab',
  standalone: true,
  imports: [NgClass],
  templateUrl: './tab.component.html',
})
export class Tab {
  /* Signal for the value of the option */
  value = input.required<string>();

  /* Signal to indicate if the option is disabled */
  disabled = input<boolean>(false);

  /* Signal to indicate if the option is selected */
  selected = signal<boolean>(false);

  /* Signal to indicate if the option is highlighted */
  highlighted = signal<boolean>(false);

  /* Signal for the output when the tabs is selected */
  select = output<Tab>();

  constructor(public el: ElementRef) {}

  onSelect(): void {
    this.select.emit(this);
  }

  onMouseEnter() {
    if (!this.disabled() && !this.el.nativeElement.parentElement.parentElement.classList.contains('keyboard-active')) {
      this.highlighted.set(true);
    }
  }

  onMouseLeave() {
    if (!this.disabled() && !this.el.nativeElement.parentElement.parentElement.classList.contains('keyboard-active')) {
      this.highlighted.set(false);
    }
  }
}
