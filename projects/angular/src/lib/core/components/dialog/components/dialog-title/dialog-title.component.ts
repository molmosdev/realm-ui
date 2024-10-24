import { Component, input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'r-dialog-title',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './dialog-title.component.html',
  styleUrl: './dialog-title.component.scss',
})
export class DialogTitle {
  /* Signals */
  aligned = input<boolean>(false);
}
