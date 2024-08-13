import { Component, contentChildren, signal } from '@angular/core';
import { SidebarItem } from '../sidebar-item/sidebar-item.component';
import { NgClass, NgStyle } from '@angular/common';
import { SidebarState } from '../../enums/sidenav-state.enum';

@Component({
  selector: 'r-sidebar-group',
  standalone: true,
  imports: [
    NgStyle,
    NgClass
  ],
  templateUrl: './sidebar-group.component.html',
  styleUrl: './sidebar-group.component.scss'
})
export class SidebarGroup {
  sidebarState = signal<SidebarState>(SidebarState.CLOSED);
  expanded = signal<boolean>(false);
  items = contentChildren(SidebarItem);
  groups = contentChildren(SidebarGroup);
  SidebarState = SidebarState;
}
