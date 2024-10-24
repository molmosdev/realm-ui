import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';

export const sidebarAnimation = trigger('sidebarAnimation', [
  state('open', style({ width: '245px' })),
  state('closed', style({ width: '40px' })),
  transition('closed => open', [
    group([animate('0.1s ease-in-out'), query('@fadeInOutAnimation', animateChild(), { optional: true, delay: 0 })]),
  ]),
  transition('open => closed', [
    group([query('@fadeInOutAnimation', animateChild(), { optional: true }), animate('0.1s 0.1s ease-in-out')]),
  ]),
]);
