import { Injectable } from '@angular/core';
import { themes } from '../../styles/themes';
import { ThemeEnum } from '../../shared/enums/theme.enum';
import { ThemePropertiesEnum } from '../../shared/enums/theme-properties.enum';

@Injectable({
  providedIn: 'root'
})
export class ThemeConfigService {
  private currentTheme: ThemeEnum = ThemeEnum.Light;

  constructor() {
    this.applyTheme(this.currentTheme);
  }

  /**
   * Apply a theme
   *
   * @param themeName
   * @param customTheme
   */
  applyTheme(
    themeName: ThemeEnum,
    customTheme?: { [K in ThemePropertiesEnum]?: string }
  ): void {
    let theme = themeName === ThemeEnum.Custom && customTheme
      ? customTheme
      // @ts-ignore
      : themes[themeName];
    if (!theme) {
      console.error(`Theme not found: ${themeName}`);
      return;
    }
    Object.keys(theme).forEach((key) => {
      document.documentElement.style.setProperty(key, theme[key]);
    });
    this.currentTheme = themeName;
  }

  /**
   * Get the current theme
   *
   * @returns string - the current theme
   */
  getTheme(): string {
    return this.currentTheme;
  }
}
