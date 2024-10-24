import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debounceTimer: any;

  /**
   * Debounce with optional delay
   *
   * @param {any} func
   * @param {any} delay
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  debounce(func: any, delay: any): void {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(func, delay);
  }

  /**
   * Stop debounce
   */
  stopDebounce(): void {
    clearTimeout(this.debounceTimer);
  }
}
