import { Component, input } from '@angular/core';

@Component({
  selector: 'r-dropdown-title',
  standalone: true,
  imports: [],
  templateUrl: './dropdown-title.component.html',
})
export class DropdownTitle {
  text = input.required<string>();
}
