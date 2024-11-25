import { NgClass } from '@angular/common';
import { Component, effect, ElementRef, input, output, viewChild } from '@angular/core';

@Component({
  selector: 'r-password',
  standalone: true,
  imports: [NgClass],
  templateUrl: './password.component.html',
})
export class Password {
  id = input<string>('password');
  placeholder = input<string>('Password');
  label = input<string | undefined>(undefined);
  error = input<boolean>(false);
  onChange = output<string | null>();
}
