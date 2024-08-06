import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[moLazyContent]',
  standalone: true
})
export class LazyContentDirective {
  tpl = inject(TemplateRef)
}
