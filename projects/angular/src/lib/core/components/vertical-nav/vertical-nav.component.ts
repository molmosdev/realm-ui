import { Component, contentChildren, input } from '@angular/core';
import { VerticalNavItem } from './components/vertical-nav-item/vertical-nav-item.component';
import { VerticalNavGroup } from './components/vertical-nav-group/vertical-nav-group.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'r-vertical-nav',
  standalone: true,
  imports: [NgClass],
  templateUrl: './vertical-nav.component.html',
})
export class VerticalNav {
  extended = input<boolean>(true);
  items = contentChildren(VerticalNavItem);
  groups = contentChildren(VerticalNavGroup);
}