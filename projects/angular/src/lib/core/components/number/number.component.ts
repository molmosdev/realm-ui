import { Component, effect, input, InputSignal, model, ModelSignal, output, OutputEmitterRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { incorrectBackgroundTrigger } from '../../../shared/animations/animations';

@Component({
  selector: 'r-number',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    NgClass
  ],
  templateUrl: './number.component.html',
  styleUrl: './number.component.scss',
  animations: [
    incorrectBackgroundTrigger
  ]
})
export class Number {
  value: ModelSignal<number | null> = model<number | null>(null);
  label: InputSignal<string | undefined> = input<string | undefined>(undefined);
  incorrect: InputSignal<boolean> = input<boolean>(false);
  onChange: OutputEmitterRef<number | null> = output<number | null>()
  inputValue: number | null = null;

  constructor() {
    effect(() => {
      this.inputValue = this.value();
      this.onChange.emit(this.inputValue);
    });
  }

  /**
   * Update the value
   *
   * @param {number | null} newValue
   */
  updateValue(newValue: number | null): void {
    this.value.set(newValue);
  }
}
