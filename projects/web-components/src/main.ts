import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { Button } from '../../angular/src/lib/core/components/button/button.component';
import { Spinner } from '../../angular/src/lib/core/components/spinner/spinner.component';
import { Dialog } from '../../angular/src/lib/core/components/dialog/dialog.component';
import {
  DialogTitle
} from '../../angular/src/lib/core/components/dialog/components/dialog-title/dialog-title.component';
import { BottomOptions } from '../../angular/src/lib/shared/components/bottom-options/bottom-options.component';
import { Dropdown } from '../../angular/src/lib/core/components/dropdown/dropdown.component';
import {
  DropdownContent
} from '../../angular/src/lib/core/components/dropdown/components/dropdown-content/dropdown-content.component';
import {
  DropdownTitle
} from '../../angular/src/lib/core/components/dropdown/components/dropdown-content/components/dropdown-title/dropdown-title.component';
import {
  DropdownItem
} from '../../angular/src/lib/core/components/dropdown/components/dropdown-content/components/dropdown-item/dropdown-item.component';
import {
  DropdownTrigger
} from '../../angular/src/lib/core/components/dropdown/components/dropdown-trigger/dropdown-trigger.component';
import { Sidebar } from '../../angular/src/lib/core/components/sidebar/sidebar.component';
import {
  SidebarItem
} from '../../angular/src/lib/core/components/sidebar/components/sidebar-item/sidebar-item.component';

const elements = [
  { tag: 'r-button', component: Button },
  { tag: 'r-spinner', component: Spinner },
  { tag: 'r-dialog', component: Dialog },
  { tag: 'r-dialog', component: DialogTitle },
  { tag: 'r-bottom-options', component: BottomOptions },
  { tag: 'r-dropdown', component: Dropdown },
  { tag: 'r-dropdown-content', component: DropdownContent },
  { tag: 'r-dropdown-title', component: DropdownTitle },
  { tag: 'r-dropdown-item', component: DropdownItem },
  { tag: 'r-dropdown-trigger', component: DropdownTrigger },
  { tag: 'r-sidebar', component: Sidebar },
  { tag: 'r-sidebar-item', component: SidebarItem }
];

createApplication().then((appRef) => {
  elements.forEach(({ tag, component }) => {
    const elementCtor = createCustomElement(component, {
      injector: appRef.injector,
    });
    customElements.define(tag, elementCtor);
  });
});
