import { Component, contentChild, effect, ElementRef, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { Dropdown } from '../../../dropdown/dropdown.component';

@Component({
  selector: 'r-row',
  standalone: true,
  imports: [NgClass],
  templateUrl: './row.component.html',
  styleUrl: './row.component.scss',
})
export class Row {
  header = input<boolean>(false);
  dropdown = contentChild(Dropdown);

  constructor(private el: ElementRef) {
    effect(() => {
      this.setRowStyles();
    });
  }

  /**
   * Set row styles
   */
  setRowStyles(): void {
    if (this.header()) {
      this.el.nativeElement.classList.add('header');
    }
  }
}
