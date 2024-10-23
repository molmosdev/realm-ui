import { Component, effect, input, InputSignal, model, ModelSignal, output, OutputEmitterRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'r-textarea',
  standalone: true,
  imports: [FormsModule, NgClass],
  templateUrl: './textarea.component.html',
  animations: [],
})
export class Textarea {
  value: ModelSignal<string | null> = model<string | null>(null);
  label: InputSignal<string | undefined> = input<string | undefined>(undefined);
  error: InputSignal<boolean> = input<boolean>(false);
  hasValueForced: InputSignal<boolean> = input<boolean>(false);
  onChange: OutputEmitterRef<string | null> = output<string | null>();
  inputValue: string = '';

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
}
