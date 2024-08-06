import { Component, ElementRef, output } from '@angular/core';

@Component({
  selector: 'r-dropdown-trigger',
  standalone: true,
  imports: [],
  templateUrl: './dropdown-trigger.component.html',
  styleUrl: './dropdown-trigger.component.scss'
})
export class DropdownTrigger {
  /* Emitters */
  triggerEmitter = output<void>();

  /* Variables */
  el = this.elementRef.nativeElement;

  constructor(
    private elementRef: ElementRef
  ) {
  }
}
