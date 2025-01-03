import { Component, effect, input, LOCALE_ID, model, output } from '@angular/core';
import { NgClass, registerLocaleData } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'r-number',
  standalone: true,
  imports: [NgClass, FormsModule],
  templateUrl: './number.component.html',
  providers: [CurrencyPipe, { provide: LOCALE_ID, useValue: 'es-ES' }],
})
export class Number {
  value = model<number | null>(null);
  displayValue: string | null = null;
  label = input<string | undefined>(undefined);
  error = input<boolean>(false);
  valueType = input<'integer' | 'decimal' | 'currency' | 'percentage'>('integer');
  onChange = output<number | null>();
  suffix = input<string | undefined>(undefined);
  disabled = model<boolean>(false);
  debounceTimer: any;

  constructor(private currencyPipe: CurrencyPipe) {
    registerLocaleData(localeEs, 'es-ES');
    effect(() => {
      this.displayValue = this.formatValue(this.value());
    });
  }

  /**
   * Update the value based on the input event
   * @param {KeyboardEvent} event - The keyboard event triggered by user input
   */
  updateValue(event: KeyboardEvent): void {
    let newValue = (event.target as HTMLInputElement).value;

    // If valueType is Integer, filter out non-numeric characters
    if (this.valueType() === 'integer') {
      newValue = newValue.replace(/[^0-9]/g, '');
      (event.target as HTMLInputElement).value = newValue; // Update the input field with the filtered value
    } else {
      // If valueType is Currency, Percentage, or Decimal, filter out non-numeric characters and commas
      newValue = newValue.replace(/[^0-9.,]/g, '');
      (event.target as HTMLInputElement).value = newValue; // Update the input field with the filtered value
    }

    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => {
      const numericValue = this.parseValue(newValue);
      this.value.set(numericValue);
      this.displayValue = this.formatValue(numericValue);
      this.onChange.emit(numericValue);
    }, 500);
  }

  /**
   * Format the value based on the valueType input
   * @param {number | null} value - The numeric value to format
   * @returns {string | null} - The formatted value as a string or null if the value is null
   */
  private formatValue(value: number | null): string | null {
    if (value === null) {
      return null;
    }

    if (this.valueType() === 'currency' || this.valueType() === 'percentage' || this.valueType() === 'decimal') {
      return this.currencyPipe.transform(value, 'EUR', '', '1.2-2', 'es-ES') || '0';
    }

    if (this.valueType() === 'integer') {
      return Math.round(value).toString();
    }

    return value.toString();
  }

  /**
   * Parse the input value to a number
   * @param {string | null} value - The input value as a string
   * @returns {number | null} - The parsed numeric value or null if the input is invalid
   */
  private parseValue(value: string | null): number | null {
    if (!value) {
      return null;
    }

    if (this.valueType() === 'currency' || this.valueType() === 'percentage' || this.valueType() === 'decimal') {
      // Remove all dots
      value = value.replace(/\./g, '');

      // Replace the last comma with a dot
      const lastCommaIndex = value.lastIndexOf(',');
      if (lastCommaIndex !== -1) {
        value = value.substring(0, lastCommaIndex) + '.' + value.substring(lastCommaIndex + 1);
      }

      // Parse the value to a float and round to 2 decimals
      let numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        numericValue = Math.round(numericValue * 100) / 100;
        return numericValue;
      }
    }

    // If not Currency, Percentage, or Decimal, handle rounding for other types
    // Replace comma with dot if necessary
    if (value.includes(',')) {
      value = value.replace(',', '.');
    }

    let numericValue = parseFloat(value);

    if (!isNaN(numericValue)) {
      if (this.valueType() === 'integer') {
        // Round to nearest integer, including values like 0.9 to 1
        numericValue = Math.round(numericValue);
      }
    }

    return numericValue;
  }
}
