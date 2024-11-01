import { Component, contentChildren, model } from '@angular/core';
import { VerticalNavItem } from '../vertical-nav-item/vertical-nav-item.component';

@Component({
  selector: 'r-vertical-nav-group',
  standalone: true,
  imports: [],
  templateUrl: './vertical-nav-group.component.html',
})
export class VerticalNavGroup {
  items = contentChildren(VerticalNavItem);
  groups = contentChildren(VerticalNavGroup);
  expanded = model<boolean>(true);

  /**
   * Toggle the expanded state of the sidebar
   */
  toggleExpandedState(): void {
    this.expanded.set(!this.expanded());
    if (!this.expanded()) {
      this.groups().forEach(group => {
        this.setRecursiveGroupsState(group);
      });
    }
  }

  /**
   * Set the state of the sidebar recursively
   *
   * @param {SidebarGroup} group
   * @param {boolean} isOpen
   */
  setRecursiveGroupsState(group: VerticalNavGroup): void {
    group.expanded.set(false);
    group.groups().forEach(group => {
      this.setRecursiveGroupsState(group);
    });
  }
}
