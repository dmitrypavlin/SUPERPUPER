/*
 * Design tokens — Figma file iGoofMynDCJVuGePDeIhK2  ·  Collection: tokens / ds
 * `tw` = primary Tailwind utility class generated from @theme in index.css
 */

export const fonts = {
  antiqa:  { family: 'Instrument Serif',  fallback: 'Georgia, serif',       tw: 'font-antiqa'  },
  grotesk: { family: 'Akkurat LL Cyr TT', fallback: 'system-ui, sans-serif', tw: 'font-grotesk' },
  pixel:   { family: 'Pixform',           fallback: 'monospace',             tw: 'font-pixel'   },
} as const;

export const fontSizes = {
  h1:          { px: 84, lh: 76, weight: 400, font: 'antiqa',  tw: 'text-h1 leading-h1 font-normal'   },
  h2:          { px: 40, lh: 36, weight: 400, font: 'antiqa',  tw: 'text-h2 leading-h2 font-normal'   },
  description: { px: 30, lh: 27, weight: 400, font: 'pixel',   tw: 'text-desc leading-desc font-normal' },
  h3:          { px: 20, lh: 18, weight: 600, font: 'grotesk', tw: 'text-h3 leading-h3 font-semibold' },
  h4:          { px: 15, lh: 14, weight: 600, font: 'grotesk', tw: 'text-h4 leading-h4 font-semibold' },
  textPixel:   { px: 10, lh:  9, weight: 400, font: 'pixel',   tw: 'text-pixel leading-pixel font-normal' },
  textGrotesk: { px: 11, lh: 10, weight: 400, font: 'grotesk', tw: 'text-grotesk leading-grotesk font-normal' },
  textBold:    { px: 11, lh: 10, weight: 700, font: 'grotesk', tw: 'text-grotesk leading-grotesk font-bold' },
  caps:        { px:  8, lh:  7, weight: 400, font: 'grotesk', tw: 'text-caps leading-caps font-normal' },
} as const;

export const colors = {
  // Base
  black:       { hex: '#000000', tw: 'bg-black'   },
  gray:        { hex: '#cbcbcb', tw: 'bg-gray'    },
  lines:       { hex: '#eaeaea', tw: 'bg-lines'   },
  superYellow: { hex: '#ffe900', tw: 'bg-yellow'  },
  bgBase:      { hex: '#f2f2f2', tw: 'bg-base'    },

  // Text & icons
  textPrimary:    { hex: '#000000', tw: 'text-primary'      },
  textSecondary:  { hex: '#979797', tw: 'text-secondary'    },
  textOnColor:    { hex: '#ffffff', tw: 'text-on-color'     },
  textBrown:      { hex: '#d1a63b', tw: 'text-brown'        },
  textGreen:      { hex: '#00867b', tw: 'text-green'        },
  textYellowDark: { hex: '#646905', tw: 'text-yellow-dark'  },

  // Controls
  controlSecondary:         { hex: '#eaeaea', tw: 'bg-control'  },
  controlOnColorWhite:      { hex: '#ffffff', tw: 'bg-white'     },
  controlOnColorBrown:      { hex: '#d1a63b', tw: 'bg-brown'     },
  controlOnColorYellowDark: { hex: '#fffd9e', tw: 'bg-on-yd'    },

  // Card backgrounds
  cardWhite:  { hex: '#ffffff', tw: 'bg-card-white'  },
  cardRed:    { hex: '#f5cfca', tw: 'bg-card-red'    },
  cardGreen:  { hex: '#d4eee7', tw: 'bg-card-green'  },
  cardYellow: { hex: '#e0e2a4', tw: 'bg-card-yellow' },
  cardPink:   { hex: '#fad5e7', tw: 'bg-card-pink'   },
  cardViolet: { hex: '#ddd6ef', tw: 'bg-card-violet' },

  // On-card element backgrounds
  onCardRed:        { hex: '#f7e0dd', tw: 'bg-on-red'    },
  onCardGreen:      { hex: '#d4eee7', tw: 'bg-on-green'  },
  onCardYellowDark: { hex: '#fffd9e', tw: 'bg-on-yd'     },
  onCardYellow:     { hex: '#e0e2a4', tw: 'bg-on-yellow' },
  onCardPink:       { hex: '#ffe3f1', tw: 'bg-on-pink'   },
  onCardViolet:     { hex: '#ddd6ef', tw: 'bg-on-violet' },

  // Tech / status
  techPurple: { hex: '#9747ff', tw: 'bg-tech-purple' },
  techGreen:  { hex: '#00867b', tw: 'bg-tech-green'  },
  techRed:    { hex: '#cc0000', tw: 'bg-tech-red'    },
  techGray:   { hex: '#cbcbcb', tw: 'bg-tech-gray'   },

  // Bar
  barFilled: { hex: '#b8c6c3', tw: 'bg-bar'   },
  barEmpty:  { hex: '#ffffff', tw: 'bg-white'  },
} as const;

export const indents = {
  neg1:  { px:  -1, tw: '-'       },
  negXS: { px:  -8, tw: '-p-xs'   },
  xxxs:  { px:   2, tw: 'p-xxxs'  },
  xxs:   { px:   4, tw: 'p-xxs'   },
  xs:    { px:   8, tw: 'p-xs'    },
  s:     { px:  14, tw: 'p-s'     },
  m:     { px:  20, tw: 'p-m'     },
  l:     { px:  24, tw: 'p-l'     },
  x:     { px:  30, tw: 'p-x'     },
  xxl:   { px:  90, tw: 'p-xxl'   },
} as const;

export const radius = {
  s:    { px:   4, tw: 'rounded-s'    },
  m:    { px:   8, tw: 'rounded-m'    },
  l:    { px:  12, tw: 'rounded-l'    },
  over: { px: 999, tw: 'rounded-over' },
} as const;
