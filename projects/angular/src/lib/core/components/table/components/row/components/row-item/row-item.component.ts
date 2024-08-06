import { Component, effect, ElementRef, input, InputSignal } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'r-row-item',
  standalone: true,
  imports: [
    NgStyle
  ],
  templateUrl: './row-item.component.html',
  styleUrl: './row-item.component.scss'
})
export class RowItem {
  width: InputSignal<number | undefined> = input<number>();
  alignedLeft: InputSignal<boolean> = input<boolean>(false);

  constructor(
    private el: ElementRef
  ) {
    effect(() => {
      this.setRowItemStyles();
    })
  }

  /**
   * Set the styles of the row item
   */
  setRowItemStyles(): void {
    if (this.width() !== undefined) {
      this.el.nativeElement.style.width = `${this.width()}px`;
      this.el.nativeElement.style.flex = 'none';
    } else {
      this.el.nativeElement.style.flex = '1'
    }
    if (this.alignedLeft()) {
      this.el.nativeElement.style.justifyContent = 'flex-start';
    }
  }
}
