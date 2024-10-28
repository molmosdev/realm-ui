import { Component, effect, input, LOCALE_ID, model, output } from '@angular/core';
import { NgClass, registerLocaleData } from '@angular/common';
import { CurrencyPipe } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { ValueType } from './enums/value-type.enum';
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
  valueType = input<ValueType>(ValueType.Integer);
  onChange = output<number | null>();
  ValueType = ValueType;
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
   * Update the value
   *
   * @param {string | null} newValue
   */
  updateValue(event: KeyboardEvent): void {
    let newValue = (event.target as HTMLInputElement).value;

    // If valueType is Integer, filter out non-numeric characters
    if (this.valueType() === ValueType.Integer) {
      newValue = newValue.replace(/[^0-9]/g, '');
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
   *
   * @param {number | null} value
   * @returns {string | null}
   */
  private formatValue(value: number | null): string | null {
    if (value === null) {
      return null;
    }

    if (
      this.valueType() === ValueType.Currency ||
      this.valueType() === ValueType.Percentage ||
      this.valueType() === ValueType.Decimal
    ) {
      return this.currencyPipe.transform(value, 'EUR', '', '1.2-2', 'es-ES') || '0';
    }

    if (this.valueType() === ValueType.Integer) {
      return Math.round(value).toString();
    }

    return value.toString();
  }

  /**
   * Parse the input value to a number
   *
   * @param {string | null} value
   * @returns {number | null}
   */
  private parseValue(value: string | null): number | null {
    if (!value) {
      return null;
    }

    value = value.replace(/[^0-9.,]/g, '');

    if (
      this.valueType() === ValueType.Currency ||
      this.valueType() === ValueType.Percentage ||
      this.valueType() === ValueType.Decimal
    ) {
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
      if (this.valueType() === ValueType.Integer) {
        // Round to nearest integer, including values like 0.9 to 1
        numericValue = Math.round(numericValue);
      }
    }

    return numericValue;
  }
}
