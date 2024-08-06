import { Component, contentChildren, input, InputSignal, Signal, } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { RowItem } from './components/row-item/row-item.component';

@Component({
  selector: 'r-row',
  standalone: true,
  imports: [
    NgStyle,
    NgClass
  ],
  templateUrl: './row.component.html',
  styleUrl: './row.component.scss'
})
export class Row {
  header: InputSignal<boolean> = input<boolean>(false);
  gap: InputSignal<number> = input<number>(15);
  dropdown: InputSignal<boolean> = input<boolean>(false);
  rowElements: Signal<readonly RowItem[]> = contentChildren(RowItem);

  /**
   * Get the row style
   *
   * @returns {object} - The row style
   */
  get rowStyle(): object {
    return {
      'gap.px': this.gap(),
      'padding-left.px': this.gap(),
      'padding-right.px': this.gap() + 30
    }
  }
}
