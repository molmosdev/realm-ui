import { Component, effect, input, model, output } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'r-text',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './text.component.html',
  animations: [],
})
export class Text {
  value = model<string | null>(null);
  label = input<string | undefined>(undefined);
  error = input<boolean>(false);
  type = input<string>('text');
  hasValueForced = input<boolean>(false);
  onChange = output<string | null>();
  clearable = input<boolean>(false);
  inputValue: string = '';
  blocked = input<boolean>(false);
  formControl = input<FormControl | null>(null);

  constructor() {
    effect(() => {
      this.inputValue = this.value() || '';
    });
  }

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
   * @param {string} newValue
   */
  updateValue(newValue: string): void {
    this.value.set(newValue === '' ? null : newValue);
    this.onChange.emit(this.value());
  }

  clear() {
    this.updateValue('');
  }
}
