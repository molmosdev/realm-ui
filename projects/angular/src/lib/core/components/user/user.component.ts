import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'r-user',
  standalone: true,
  imports: [NgClass],
  templateUrl: './user.component.html',
})
export class User {
  /** Signal of the password label */
  label = input<string | undefined>(undefined);

  /** Signal of the password error */
  error = input<boolean>(false);

  /** Output signal of the password value */
  onChange = output<string | null>();
}
