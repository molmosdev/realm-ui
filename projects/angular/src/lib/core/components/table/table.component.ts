import { Component, computed, contentChildren, ElementRef, input, InputSignal, Signal } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { RowItem } from './components/row/components/row-item/row-item.component';
import { Row } from './components/row/row.component';

@Component({
  selector: 'r-table',
  standalone: true,
  imports: [
    NgStyle,
    NgClass
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class Table {
  tableWidth: Signal<number> = computed<number>(() => {
    return this.el.nativeElement.offsetWidth;
  });
  noRowsText: InputSignal<string> = input<string>('There are no rows to display');
  rows: Signal<readonly Row[]> = contentChildren(Row);
  rowElements: Signal<readonly RowItem[]> = computed(() => {
    const rows: readonly Row[] = this.rows();
    return rows.length > 0 ? rows[0].rowElements() : [];
  });
  rowWidth: Signal<number> = computed(() => {
    const elements: readonly RowItem[] = this.rowElements();
    if (elements.length === 0) {
      return 0;
    }
    let rowGap: number = this.rows()[0].gap();

    let rowsWithMinOneDropdown: number = this.rows().reduce((
      acc: number,
      rowItem: Row
    ) => {
      return acc + (rowItem.dropdown() ? 1 : 0);
    }, 0);

    let totalWidth: number = elements.reduce((
      acc: number,
      rowItem: RowItem
    ) => {
      return acc + (rowItem.width() || 0);
    }, 0);

    const elementsWithoutWidth: readonly RowItem[] = elements.filter((rowItem: RowItem) => rowItem.width() === undefined);

    if (elementsWithoutWidth.length > 0) {
      let flexWidth: number = (this.tableWidth() - totalWidth) / elementsWithoutWidth.length;
      totalWidth += flexWidth * elementsWithoutWidth.length;
    } else {
      let gapWidth: number = (elements.length - 1) * rowGap;
      let paddingWidth: number = 2 * rowGap;
      totalWidth += gapWidth + paddingWidth + (rowsWithMinOneDropdown ? 30 : 0);
    }

    return totalWidth - 2;
  });
  noRows: Signal<boolean> = computed(() => {
    return this.rows().length < 2;
  });

  constructor(
    private el: ElementRef
  ) {
  }
}
