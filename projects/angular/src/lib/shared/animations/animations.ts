import { animate, state, style, transition, trigger } from '@angular/animations';

export const fadeInOutAnimation = trigger('fadeInOutAnimation', [
  transition(':enter', [style({ opacity: 0 }), animate('0.2s', style({ opacity: 1 }))]),
  transition(':leave', [animate('0.2s', style({ opacity: 0 }))]),
]);

export const fadeInOutZoomAnimation = trigger('fadeInOutZoomAnimation', [
  transition(':enter', [style({ opacity: 0, scale: 0.98 }), animate('0.2s', style({ opacity: 1, scale: 1 }))]),
  transition(':leave', [animate('0.2s', style({ opacity: 0, scale: 0.98 }))]),
]);

export const fadeInOutVerticalTrigger = trigger('fadeInOutVerticalTrigger', [
  transition(
    ':enter',
    [
      style({ opacity: 0, transform: '{{ translateFrom }}' }),
      animate('0.1s', style({ opacity: 1, transform: '{{ translateTo }}' })),
    ],
    { params: { translateFrom: 'translateY(-5px)', translateTo: 'translateY(0)' } }
  ),
  transition(':leave', [animate('0.1s', style({ opacity: 0, transform: '{{ translateFrom }}' }))], {
    params: { translateFrom: 'translateY(-5px)', translateTo: 'translateY(0)' },
  }),
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

export const incorrectBackgroundTrigger = trigger('incorrectBackgroundTrigger', [
  state('true', style({ backgroundColor: '#FDE3E3FF' })),
  state('false', style({ backgroundColor: 'transparent' })),
  transition('* <=> *', [animate('0.2s')]),
]);

export const incorrectBackgroundGradientTrigger = trigger('incorrectBackgroundGradientTrigger', [
  state('true', style({ background: '#FDE3E3FF' })),
  state('false', style({ background: 'linear-gradient(90deg, transparent 0%, var(--background) 51%)' })),
  transition('* <=> *', [animate('0.2s')]),
]);
