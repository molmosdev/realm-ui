import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'r-row',
  standalone: true,
  imports: [NgClass],
  templateUrl: './row.component.html',
})
export class Row {
  header = input<boolean>(false);
  clickable = input<boolean>(false);
}
