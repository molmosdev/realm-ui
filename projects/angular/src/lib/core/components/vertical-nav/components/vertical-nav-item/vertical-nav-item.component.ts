import { NgClass } from '@angular/common';
import { Component, input, signal } from '@angular/core';
import { fadeInOutTrigger } from '../../../../../shared/animations/animations';

@Component({
  selector: 'r-vertical-nav-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './vertical-nav-item.component.html',
})
export class VerticalNavItem {
  active = input<boolean>(false);
  disabled = input<boolean>(false);
}
