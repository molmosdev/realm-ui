import { NgClass } from '@angular/common';
import { Component, effect, ElementRef, input, output, viewChild } from '@angular/core';

@Component({
  selector: 'r-password',
  standalone: true,
  imports: [NgClass],
  templateUrl: './password.component.html',
})
export class Password {
  /** Signal of the password label */
  label = input<string | undefined>(undefined);

  /** Signal of the password error */
  error = input<boolean>(false);

  /** Output signal of the password value */
  onChange = output<string | null>();
}
