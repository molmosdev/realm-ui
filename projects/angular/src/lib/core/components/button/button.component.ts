import { Component, input, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { Spinner } from '../spinner/spinner.component';
import { fadeInOutTrigger } from '../../../shared/animations/animations';

@Component({
  selector: 'r-button',
  standalone: true,
  imports: [NgClass, Spinner],
  templateUrl: './button.component.html',
  animations: [fadeInOutTrigger],
})
export class Button {
  type = input<'primary' | 'secondary' | 'ghost'>('primary');
  loading = input<boolean>(false);
  onClick = output<void>();
}
