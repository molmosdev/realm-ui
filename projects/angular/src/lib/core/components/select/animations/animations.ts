import { animateChild, query, transition, trigger } from '@angular/animations';

export const optionsTrigger = trigger('optionsTrigger', [
  transition(':enter', [
    query('@fadeInOutVerticalTrigger', animateChild()),
    query('@fadeInOutAnimation', animateChild())
  ]),
  transition(':leave', [
    query('@fadeInOutVerticalTrigger', animateChild()),
    query('@fadeInOutAnimation', animateChild())
  ])
])