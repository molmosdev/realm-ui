import { NgClass } from '@angular/common';
import { Component, ElementRef, output, input, signal } from '@angular/core';

@Component({
  selector: 'r-option',
  standalone: true,
  templateUrl: './option.component.html',
  imports: [NgClass],
})
export class Option {
  /* Signal for the value of the option */
  value = input.required<string>();

  /* Signal to indicate if the option is disabled */
  disabled = input<boolean>(false);

  /* Signal for the prefix of the option */
  prefix = input<string>('');

  /* Signal for the suffix of the option */
  suffix = input<string>('');

  /* Signal to indicate if the option is selected */
  selected = signal<boolean>(false);

  /* Signal to indicate if the option is highlighted */
  highlighted = signal<boolean>(false);

  /* Signal for the output when the option is selected */
  select = output<Option>();

  constructor(public el: ElementRef) {}

  onSelect() {
    if (!this.disabled()) {
      this.select.emit(this);
    }
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
