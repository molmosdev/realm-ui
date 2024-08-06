import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { BottomOptionsTypeEnum } from './enums/bottom-options-type.enum';

@Component({
  selector: 'r-bottom-options',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './bottom-options.component.html',
  styleUrl: './bottom-options.component.scss'
})
export class BottomOptions {

  /* Signals */
  type = input.required<BottomOptionsTypeEnum>();

}
