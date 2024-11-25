import { Component, input, InputSignal, model, ModelSignal, output, OutputEmitterRef } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'r-switch',
  standalone: true,
  imports: [NgClass],
  templateUrl: './switch.component.html',
})
export class Switch {
  value = model(false);
  label = input<string>('');
  onChange = output<boolean>();

  /**
   * Toggle the switch value
   */
  toggleSwitch(): void {
    this.value.set(!this.value());
    this.onChange.emit(this.value());
  }
}
