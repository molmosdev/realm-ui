import { Component, contentChildren, HostListener, signal } from '@angular/core';
import { SidebarState } from './enums/sidenav-state.enum';
import { SidebarItem } from './components/sidebar-item/sidebar-item.component';
import { fadeInOutAnimation, fadeInOutHorizontalTrigger } from '../../../shared/animations/animations';
import { PinState } from './enums/pin-state.enum';
import { sidebarAnimation, sidebarPaddingAnimation } from './animations/animations';
import { SidebarGroup } from './components/sidebar-group/sidebar-group.component';

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
    sidebarAnimation,
    fadeInOutHorizontalTrigger
  ]
})
export class Sidebar {
  /* Signals */
  sidebarState = signal<SidebarState>(SidebarState.CLOSED);
  lastSidebarState = signal<SidebarState>(SidebarState.CLOSED);
  pinState = signal<PinState>(PinState.UNPINNED);
  items = contentChildren(SidebarItem);
  groups = contentChildren(SidebarGroup);

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

  /**
   * Get the trigger data for the fade in/out horizontal animation
   *
   * @returns {object} - The trigger data for the fade in/out horizontal animation
   */
  get fadeInOutHorizontalTriggerData(): object {
    return {
      value: '',
      params: {
        translateFrom: 'translateX(-5px)',
        translateTo: 'translateX(0)'
      }
    }
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
    this.groups().forEach(group => {
      this.setRecursiveGroupsState(group, state);
    });
  }

  /**
   * Set the state of the sidebar recursively
   *
   * @param {SidebarGroup} group
   * @param {SidebarState} state
   */
  setRecursiveGroupsState(
    group: SidebarGroup,
    state: SidebarState
  ): void {
    group.sidebarState.set(state);
    group.items().forEach(item => item.state.set(state));
    group.groups().forEach(group => {
      this.setRecursiveGroupsState(group, state);
    });
  }

  /**
   * Toggle the state of the sidebar
   */
  togglePin(): void {
    this.pinState.set(this.pinState() === PinState.PINNED ? PinState.UNPINNED : PinState.PINNED);
  }
}
