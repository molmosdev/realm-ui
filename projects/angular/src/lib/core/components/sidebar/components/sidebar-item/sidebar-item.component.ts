import { Component, signal } from '@angular/core';
import { SidebarState } from '../../enums/sidenav-state.enum';
import { fadeInOutAnimation } from '../../../../../shared/animations/animations';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'r-sidebar-item',
  standalone: true,
  imports: [
    NgTemplateOutlet
  ],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss',
  animations: [
    fadeInOutAnimation
  ]
})
export class SidebarItem {
  /* Signals */
  state = signal<SidebarState>(SidebarState.CLOSED);

  /* Enums */
  SidenavState = SidebarState;
}