import { Component, effect, input, InputSignal, output, OutputEmitterRef, } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'r-select-option',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './select-option.component.html',
  styleUrl: './select-option.component.scss'
})
export class SelectOption {
  id: InputSignal<string | null | undefined> = input<string | undefined | null>(undefined);
  value: InputSignal<string | null> = input.required<string | null>();
  selectEmitter: OutputEmitterRef<void> = output<void>();
  focusedEmitter: OutputEmitterRef<void> = output<void>();
  optionId: string | null = null;
  selected: boolean = false;
  focused: boolean = false;
  usingKeyboard: boolean = false;

  constructor() {
    effect(() => {
      this.setOptionId();
    });
  }

  /**
   * Set the option id
   */
  setOptionId(): void {
    if (typeof this.id() === 'undefined') {
      this.optionId = this.value();
    } else {
      this.optionId = this.id()!;
    }
  }

  /**
   * Emit the select event
   */
  select(): void {
    this.selectEmitter.emit();
  }

  /**
   * Emit the focus event
   */
  focus(): void {
    this.usingKeyboard = false;
    this.focusedEmitter.emit();
  }
}
