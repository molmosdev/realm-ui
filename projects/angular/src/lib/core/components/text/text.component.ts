import { Component, computed, forwardRef, input, model, output } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'r-text',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass],
  templateUrl: './text.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Text),
      multi: true,
    },
  ],
  animations: [],
})
export class Text {
  value = model<string | null>(null);
  displayValue = computed(() => this.value() || '');
  label = input<string | undefined>(undefined);
  error = input<boolean>(false);
  type = input<string>('text');
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
   * @param {string} newValue
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

  /* ControlValueAccessor */

  formControl = input<FormControl | null>(null);

  onChangeFn: (value: string) => void = () => {};
  onTouchedFn: () => void = () => {};

  writeValue(value: string): void {
    this.value.set(value);
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
