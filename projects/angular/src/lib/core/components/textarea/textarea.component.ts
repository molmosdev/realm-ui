import { Component, computed, input, InputSignal, model, ModelSignal, output, OutputEmitterRef } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'r-textarea',
  standalone: true,
  imports: [NgClass],
  templateUrl: './textarea.component.html',
  animations: [],
})
export class Textarea {
  value: ModelSignal<string | null> = model<string | null>(null);
  displayValue = computed(() => this.value() || '');
  label: InputSignal<string | undefined> = input<string | undefined>(undefined);
  error: InputSignal<boolean> = input<boolean>(false);
  hasValueForced: InputSignal<boolean> = input<boolean>(false);
  onChange: OutputEmitterRef<string | null> = output<string | null>();

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
}
