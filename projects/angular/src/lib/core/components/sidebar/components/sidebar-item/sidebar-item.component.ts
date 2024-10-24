import { Component, signal } from '@angular/core';
import { fadeInOutTrigger } from '../../../../../shared/animations/animations';
import { NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'r-sidebar-item',
  standalone: true,
  imports: [NgTemplateOutlet, NgClass],
  templateUrl: './sidebar-item.component.html',
  styleUrl: './sidebar-item.component.scss',
  animations: [fadeInOutTrigger],
})
export class SidebarItem {
  isOpen = signal<boolean>(true);
}
