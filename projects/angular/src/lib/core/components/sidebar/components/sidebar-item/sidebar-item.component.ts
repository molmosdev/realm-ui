import { Component, signal } from '@angular/core';
import { fadeInOutAnimation } from '../../../../../shared/animations/animations';
import { NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'r-sidebar-item',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NgClass
  ],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss',
  animations: [
    fadeInOutAnimation
  ]
})
export class SidebarItem {
  isOpen = signal<boolean>(true);
}