import { Component, ElementRef, input, output } from '@angular/core';

@Component({
  selector: 'r-dropdown-trigger',
  standalone: true,
  imports: [],
  templateUrl: './dropdown-trigger.component.html',
  styleUrl: './dropdown-trigger.component.scss',
})
export class DropdownTrigger {
  disabled = input<boolean>(false);
  triggerEmitter = output<void>();
  el = this.elementRef.nativeElement;

  constructor(private elementRef: ElementRef) {}
}
