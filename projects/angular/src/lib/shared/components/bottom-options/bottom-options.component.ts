import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'r-bottom-options',
  standalone: true,
  imports: [NgClass],
  templateUrl: './bottom-options.component.html',
  styleUrl: './bottom-options.component.scss',
})
export class BottomOptions {
  type = input.required<'left' | 'right' | 'spread'>();
}
