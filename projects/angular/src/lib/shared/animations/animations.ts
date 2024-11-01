import { animate, state, style, transition, trigger } from '@angular/animations';

export const fadeInOutTrigger = trigger('fadeInOutTrigger', [
  transition(':enter', [style({ opacity: 0 }), animate('0.1s', style({ opacity: 1 }))]),
  transition(':leave', [animate('0.1s', style({ opacity: 0 }))]),
]);

export const fadeInOutZoomTrigger = trigger('fadeInOutZoomTrigger', [
  transition(':enter', [style({ opacity: 0, scale: 0.98 }), animate('0.1s', style({ opacity: 1, scale: 1 }))]),
  transition(':leave', [animate('0.1s', style({ opacity: 0, scale: 0.98 }))]),
]);

export const fadeInOutHorizontalTrigger = trigger('fadeInOutHorizontalTrigger', [
  transition(
    ':enter',
    [
      style({ opacity: 0, transform: '{{ translateFrom }}' }),
      animate('0.2s', style({ opacity: 1, transform: '{{ translateTo }}' })),
    ],
    { params: { translateFrom: 'translateX(-5px)', translateTo: 'translateX(0)' } }
  ),
  transition(':leave', [animate('0.2s', style({ opacity: 0, transform: '{{ translateFrom }}' }))], {
    params: { translateFrom: 'translateX(-5px)', translateTo: 'translateX(0)' },
  }),
]);
