import { Component, contentChildren, HostListener, signal } from '@angular/core';
import { SidebarState } from './enums/sidenav-state.enum';
import { SidebarItem } from './components/sidebar-item/sidebar-item.component';
import { fadeInOutAnimation } from '../../../shared/animations/animations';
import { PinState } from './enums/pin-state.enum';
import { sidebarAnimation, sidebarPaddingAnimation } from './animations/animations';

@Component({
  selector: 'r-sidebar',
  standalone: true,
  imports: [
    SidebarItem
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    fadeInOutAnimation,
    sidebarPaddingAnimation,
    sidebarAnimation
  ]
})
export class Sidebar {
  /* Signals */
  sidebarState = signal<SidebarState>(SidebarState.CLOSED);
  lastSidebarState = signal<SidebarState>(SidebarState.CLOSED);
  pinState = signal<PinState>(PinState.UNPINNED);
  items = contentChildren(SidebarItem);

  /* Enums */
  SidenavState = SidebarState;
  PinState = PinState;

  /**
   * Check if the screen is mobile or tablet
   *
   * @returns {boolean} - True if the screen is mobile or tablet, false otherwise
   */
  get isMobileOrTablet(): boolean {
    return document.documentElement.clientWidth < 1182;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (this.isMobileOrTablet && this.sidebarState() !== this.lastSidebarState()) {
      this.pinState.set(PinState.UNPINNED);
      this.setSidenavState(SidebarState.CLOSED);
      this.lastSidebarState.set(this.sidebarState());
    }
  }

  /**
   * Set the state of the sidebar
   *
   * @param state The state of the sidebar
   */
  setSidenavState(state: SidebarState): void {
    this.sidebarState.set(state);
    this.items().forEach(item => item.state.set(state));
  }

  /**
   * Toggle the state of the sidebar
   */
  togglePin(): void {
    this.pinState.set(this.pinState() === PinState.PINNED ? PinState.UNPINNED : PinState.PINNED);
  }
}
