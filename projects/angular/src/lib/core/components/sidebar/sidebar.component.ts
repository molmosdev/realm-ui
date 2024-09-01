import { Component, contentChildren, signal } from '@angular/core';
import { SidebarItem } from './components/sidebar-item/sidebar-item.component';
import { fadeInOutAnimation, fadeInOutHorizontalTrigger } from '../../../shared/animations/animations';
import { sidebarAnimation } from './animations/animations';
import { SidebarGroup } from './components/sidebar-group/sidebar-group.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'r-sidebar',
  standalone: true,
  imports: [
    SidebarItem,
    NgClass
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    fadeInOutAnimation,
    sidebarAnimation,
    fadeInOutHorizontalTrigger
  ]
})
export class Sidebar {
  isOpen = signal<boolean>(true);
  items = contentChildren(SidebarItem);
  groups = contentChildren(SidebarGroup);

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

  /**
   * Set the state of the sidebar
   *
   * @param {boolean} isOpen
   */
  setSidenavState(isOpen: boolean): void {
    this.isOpen.set(isOpen);
    this.items().forEach(item => item.isOpen.set(isOpen));
    this.groups().forEach(group => {
      this.setRecursiveGroupsState(group, isOpen);
    });
  }

  /**
   * Set the state of the sidebar recursively
   *
   * @param {SidebarGroup} group
   * @param {boolean} isOpen
   */
  setRecursiveGroupsState(
    group: SidebarGroup,
    isOpen: boolean
  ): void {
    group.isOpen.set(isOpen);
    group.items().forEach(item => item.isOpen.set(isOpen));
    group.groups().forEach(group => {
      this.setRecursiveGroupsState(group, isOpen);
    });
  }
}
