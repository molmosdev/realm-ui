import { createCustomElement } from '@angular/elements';
import { createApplication } from '@angular/platform-browser';
import { Button } from '../../angular/src/lib/core/components/button/button.component';
import { Spinner } from '../../angular/src/lib/core/components/spinner/spinner.component';
import { Dialog } from '../../angular/src/lib/core/components/dialog/dialog.component';
import { DialogTitle } from '../../angular/src/lib/core/components/dialog/components/dialog-title/dialog-title.component';
import { Dropdown } from '../../angular/src/lib/core/components/dropdown/dropdown.component';
import { DropdownContent } from '../../angular/src/lib/core/components/dropdown/components/dropdown-content/dropdown-content.component';
import { DropdownTitle } from '../../angular/src/lib/core/components/dropdown/components/dropdown-content/components/dropdown-title/dropdown-title.component';
import { DropdownItem } from '../../angular/src/lib/core/components/dropdown/components/dropdown-content/components/dropdown-item/dropdown-item.component';
import { DropdownTrigger } from '../../angular/src/lib/core/components/dropdown/components/dropdown-trigger/dropdown-trigger.component';
import { Text } from '../../angular/src/lib/core/components/text/text.component';
import { Number } from '../../angular/src/lib/core/components/number/number.component';
import { Switch } from '../../angular/src/lib/core/components/switch/switch.component';
import { Table } from '../../angular/src/lib/core/components/table/table.component';
import { Row } from '../../angular/src/lib/core/components/table/components/row/row.component';
import { RowItem } from '../../angular/src/lib/core/components/table/components/row/components/row-item/row-item.component';
import { Textarea } from '../../angular/src/lib/core/components/textarea/textarea.component';
import { Select } from '../../angular/src/lib/core/components/select/select.component';
import { Search } from '../../angular/src/lib/core/components/search/search.component';
import { Tabs } from '../../angular/src/lib/core/components/tabs/tabs.component';
import { Tab } from '../../angular/src/lib/core/components/tabs/components/tab/tab.component';
import { Password } from '../../angular/src/lib/core/components/password/password.component';
import { User } from '../../angular/src/lib/core/components/user/user.component';
import { VerticalNav } from '../../angular/src/lib/core/components/vertical-nav/vertical-nav.component';
import { VerticalNavGroup } from '../../angular/src/lib/core/components/vertical-nav/components/vertical-nav-group/vertical-nav-group.component';
import { VerticalNavItem } from '../../angular/src/lib/core/components/vertical-nav/components/vertical-nav-item/vertical-nav-item.component';

const elements = [
  { tag: 'r-button', component: Button },
  { tag: 'r-spinner', component: Spinner },
  { tag: 'r-dialog', component: Dialog },
  { tag: 'r-dialog-title', component: DialogTitle },
  { tag: 'r-dropdown', component: Dropdown },
  { tag: 'r-dropdown-content', component: DropdownContent },
  { tag: 'r-dropdown-title', component: DropdownTitle },
  { tag: 'r-dropdown-item', component: DropdownItem },
  { tag: 'r-dropdown-trigger', component: DropdownTrigger },
  { tag: 'r-text', component: Text },
  { tag: 'r-number', component: Number },
  { tag: 'r-switch', component: Switch },
  { tag: 'r-table', component: Table },
  { tag: 'r-row', component: Row },
  { tag: 'r-row-item', component: RowItem },
  { tag: 'r-textarea', component: Textarea },
  { tag: 'r-select', component: Select },
  { tag: 'r-search', component: Search },
  { tag: 'r-tabs', component: Tabs },
  { tag: 'r-tab', component: Tab },
  { tag: 'r-password', component: Password },
  { tag: 'r-user', component: User },
  { tag: 'r-vertical-nav', component: VerticalNav },
  { tag: 'r-vertical-nav-group', component: VerticalNavGroup },
  { tag: 'r-vertical-nav-item', component: VerticalNavItem },
];

createApplication().then(appRef => {
  elements.forEach(({ tag, component }) => {
    const elementCtor = createCustomElement(component, {
      injector: appRef.injector,
    });
    customElements.define(tag, elementCtor);
  });
});
