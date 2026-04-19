import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        waye: {
          bg:           '#0a0a0a',
          surface:      '#1a1a1a',
          border:       'rgba(255,255,255,0.08)',
          pink:         '#C4847A',
          'pink-light': '#E8AEA8',
          'pink-dark':  '#A86660',
          'pink-muted': 'rgba(196,132,122,0.15)',
          text:         '#FFFFFF',
          muted:        '#A0A0A0',
        },
        health: {
          green:  '#4CAF50',
          yellow: '#E8C97A',
          red:    '#E07070',
        },
      },
      fontFamily: {
        serif:  ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:   ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        nav: '0.15em',
      },
      borderRadius: {
        DEFAULT: '0px',
        sm: '2px',
        md: '2px',
        lg: '2px',
        xl: '2px',
        '2xl': '2px',
        full: '9999px',
      },
    },
  },
  plugins: [],
}
export default config
