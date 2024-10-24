import { Component, ElementRef, HostListener, input, output, viewChild } from '@angular/core';
import { ButtonTypeEnum } from './enums/button-type.enum';
import { NgClass, NgStyle } from '@angular/common';
import { Spinner } from '../spinner/spinner.component';
import { ISpinner } from '../spinner/models/spinner.model';
import { fadeInOutTrigger } from '../../../shared/animations/animations';

@Component({
  selector: 'r-button',
  standalone: true,
  imports: [NgClass, Spinner, NgStyle],
  templateUrl: './button.component.html',
  animations: [fadeInOutTrigger],
})
export class Button {
  type = input<ButtonTypeEnum>(ButtonTypeEnum.Primary);
  loading = input<boolean>(false);
  onClick = output<void>();

  /**
   * Get the spinner data
   *
   * @returns {ISpinner} - The spinner data
   */
  get spinnerData(): ISpinner {
    return {
      active: this.loading(),
      size: 18,
      color: 'var(--primary-foreground)',
    };
  }
}
