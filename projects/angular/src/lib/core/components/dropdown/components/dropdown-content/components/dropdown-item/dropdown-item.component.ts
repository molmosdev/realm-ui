import { Component, input } from '@angular/core';
import { NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'r-dropdown-item',
  standalone: true,
  imports: [NgClass, NgTemplateOutlet],
  templateUrl: './dropdown-item.component.html',
})
export class DropdownItem {
  disabled = input<boolean>(false);
  selected = input<boolean>(false);
}
