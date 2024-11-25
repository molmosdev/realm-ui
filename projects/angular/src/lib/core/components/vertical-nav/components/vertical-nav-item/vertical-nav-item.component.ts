import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

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
