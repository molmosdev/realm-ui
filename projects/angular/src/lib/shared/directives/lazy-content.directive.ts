import { Directive, inject, TemplateRef } from '@angular/core';

@Directive({
  selector: '[r-lazy]',
  standalone: true,
})
export class LazyContentDirective {
  tpl = inject(TemplateRef);
}
