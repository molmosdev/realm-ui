import { Component, contentChildren, signal } from '@angular/core';
import { SidebarItem } from '../sidebar-item/sidebar-item.component';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'r-sidebar-group',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './sidebar-group.component.html',
  styleUrl: './sidebar-group.component.scss',
})
export class SidebarGroup {
  isOpen = signal<boolean>(false);
  expanded = signal<boolean>(false);
  items = contentChildren(SidebarItem);
  groups = contentChildren(SidebarGroup);
}
