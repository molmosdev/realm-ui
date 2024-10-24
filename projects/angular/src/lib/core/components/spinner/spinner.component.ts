import { Component, input } from '@angular/core';
import { ISpinner } from './models/spinner.model';
import { NgOptimizedImage, NgStyle } from '@angular/common';

@Component({
  selector: 'r-spinner',
  standalone: true,
  imports: [NgOptimizedImage, NgStyle],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class Spinner {
  /* Inputs*/
  data = input.required<ISpinner>();

  /* Variables */
  spinnerSrc = '../../../assets/img/spinner.svg';
}
