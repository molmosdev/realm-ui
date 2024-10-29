import { Component, input } from '@angular/core';
import { NgOptimizedImage, NgStyle } from '@angular/common';

@Component({
  selector: 'r-spinner',
  standalone: true,
  imports: [NgOptimizedImage, NgStyle],
  templateUrl: './spinner.component.html',
})
export class Spinner {
  /** Signal of the spinner active state */
  active = input<boolean>(true);

  /** Signal of the spinner color */
  color = input<string>('var(--foreground)');

  /** Signal of the spinner background color */
  backgroundColor = input<string>('var(--background)');

  /** Signal of the spinner size */
  size = input<number>(20);
}
