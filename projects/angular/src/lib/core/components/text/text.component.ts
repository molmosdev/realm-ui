import { Component, computed, input, model, output } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'r-text',
  standalone: true,
  imports: [NgClass],
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

  /**
   * Get the input trigger state
   *
   * @returns {string} - The input trigger state
   */
  get inputTriggerState(): string {
    return this.label() ? (this.value() ? 'hasValue' : 'null') : 'withoutLabel';
  }

  /**
   * Update the value
   *
   * @param {KeyboardEvent} event
   */
  updateValue(event: KeyboardEvent): void {
    const newValue = (event.target as HTMLInputElement).value;
    this.value.set(newValue === '' ? null : newValue);
    this.onChange.emit(this.value());
  }

  clear() {
    this.value.set(null);
    this.onChange.emit(null);
  }
}
