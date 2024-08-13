import { animate, animateChild, group, query, state, style, transition, trigger } from '@angular/animations';

export const sidebarPaddingAnimation = trigger('sidebarPaddingAnimation', [
  state('unpinned', style({ paddingLeft: '84px', paddingTop: '0px' })),
  state('pinned', style({ paddingLeft: '265px', paddingTop: '0px' })),
  transition('* <=> *', [
    animate('0.1s ease-in-out'),
    query('@sidebarAnimation', animateChild(), { optional: true }),
    query('@fadeInOutAnimation', animateChild(), { optional: true })
  ])
]);

export const sidebarAnimation = trigger('sidebarAnimation', [
  state('open-unpinned', style({ width: '245px' })),
  state('closed-unpinned', style({ width: '64px' })),
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