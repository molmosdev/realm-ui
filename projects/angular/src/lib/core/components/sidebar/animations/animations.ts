import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';

export const sidebarPaddingAnimation = trigger('sidebarPaddingAnimation', [
  state('unpinned', style({ paddingLeft: '64px', paddingTop: '0px' })),
  state('pinned', style({ paddingLeft: '245px', paddingTop: '0px' })),
  transition('* <=> *', [
    animate('0.1s ease-in-out'),
    query('@sidebarAnimation', animateChild(), { optional: true }),
    query('@fadeInOutAnimation', animateChild(), { optional: true })
  ])
]);

export const sidebarAnimation = trigger('sidebarAnimation', [
  state('open-unpinned', style({ width: '245px', boxShadow: '10px 0px 15px 5px rgba(1, 1, 1, 0.01)' })),
  state('closed-unpinned', style({ width: '64px', boxShadow: '10px 0px 15px 5px transparent' })),
  state('open-pinned', style({ width: '245px' })),
  transition('closed-unpinned => open-unpinned', [
    group([
      animate('0.1s ease-in-out'),
      query('@fadeInOutAnimation', animateChild(), { optional: true, delay: 0 }),
    ])
  ]),
  transition('open-unpinned => closed-unpinned', [
    group([
      query('@fadeInOutAnimation', animateChild(), { optional: true }),
      animate('0.1s 0.1s ease-in-out'),
    ])
  ]),
  transition('* <=> *', [
    animate('0.1s ease-in-out'),
    query('@fadeInOutAnimation', animateChild(), { optional: true }),
  ])
]);