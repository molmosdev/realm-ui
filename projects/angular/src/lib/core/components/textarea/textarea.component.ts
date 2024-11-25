import { Component, computed, input, model, output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'r-textarea',
  standalone: true,
  imports: [NgClass],
  templateUrl: './textarea.component.html',
  animations: [],
})
export class Textarea {
  value = model<string | null>(null);
  displayValue = computed(() => this.value() || '');
  label = input<string | undefined>(undefined);
  error = input<boolean>(false);
  hasValueForced = input<boolean>(false);
  onChange = output<string | null>();

  /**
   * Get the input trigger state
   * @returns {string} - The input trigger state
   */
  get inputTriggerState(): string {
    return this.label() ? (this.value() ? 'hasValue' : 'null') : 'withoutLabel';
  }

  /**
   * Update the value
   * @param {KeyboardEvent} event - The keyboard event
   */
  updateValue(event: KeyboardEvent): void {
    const newValue = (event.target as HTMLInputElement).value;
    this.value.set(newValue === '' ? null : newValue);
    this.onChange.emit(this.value());
  }
}
