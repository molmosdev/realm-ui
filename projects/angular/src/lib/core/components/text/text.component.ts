import { Component, computed, input, model, output } from '@angular/core';
import { NgClass } from '@angular/common';
import { Spinner } from '../spinner/spinner.component';

@Component({
  selector: 'r-text',
  standalone: true,
  imports: [NgClass, Spinner],
  templateUrl: './text.component.html',
  animations: [],
})
export class Text {
  value = model<string | null>(null);
  displayValue = computed(() => this.value() || '');
  label = input<string | undefined>(undefined);
  error = input<boolean>(false);
  hasValueForced = input<boolean>(false);
  onChange = output<string | null>();
  clearable = input<boolean>(false);
  disabled = model<boolean>(false);
  searching = input<boolean>(false);

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
    if (newValue !== this.value()) {
      this.value.set(newValue === '' ? null : newValue);
      this.onChange.emit(this.value());
    }
  }

  /**
   * Clear the value
   */
  clear() {
    this.value.set(null);
    this.onChange.emit(null);
  }
}
