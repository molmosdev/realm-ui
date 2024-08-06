import { Component, ElementRef, HostListener, input, viewChild } from '@angular/core';
import { ButtonTypeEnum } from './enums/button-type.enum';
import { NgClass, NgStyle } from '@angular/common';
import { Spinner } from '../spinner/spinner.component';
import { ISpinner } from '../spinner/models/spinner.model';
import { fadeInOutAnimation } from '../../../shared/animations/animations';

@Component({
  selector: 'r-button',
  standalone: true,
  imports: [
    NgClass,
    Spinner,
    NgStyle
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  animations: [
    fadeInOutAnimation
  ]
})
export class Button {

  /* Inputs */
  type = input<ButtonTypeEnum>(ButtonTypeEnum.Primary);
  loading = input<boolean>(false);
  button = viewChild<ElementRef>('button');

  /**
   * Get the padding-inline style
   *
   * @returns {object} - The padding-inline style
   */
  get paddingInlineStyle(): object {
    // Get the native element of the button
    let nativeElement = this.button()?.nativeElement;

    // Get only the number from border-radius
    let borderRadiusNumber = parseInt(window.getComputedStyle(nativeElement).getPropertyValue('border-radius'), 10);

    // Define the limits for padding-inline
    let minPadding = 10;
    let maxPadding = 18;

    // Define the limits for borderRadiusNumber (adjust these values according to your needs)
    let minBorderRadius = 0;
    let maxBorderRadius = 50;

    // Calculate the corresponding padding
    let padding = minPadding + (maxPadding - minPadding) * ((borderRadiusNumber - minBorderRadius) / (maxBorderRadius - minBorderRadius));

    // Ensure padding does not exceed the limits
    padding = Math.max(padding, minPadding);
    padding = Math.min(padding, maxPadding);

    return {
      'padding-inline': `${padding}px`
    }
  }

  /**
   * Get the spinner data
   *
   * @returns {ISpinner} - The spinner data
   */
  get spinnerData(): ISpinner {
    return {
      active: this.loading(),
      size: 18,
      color: 'var(--primary-foreground)'
    }
  }

  /**
   * Listen for keyboard events
   */
  @HostListener('keydown', ['$event']) onKeydownHandler(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      this.button()?.nativeElement.click();
      event.preventDefault();
    }
  }

}
