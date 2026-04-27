import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#fdfcf9',
        fg: '#0c0c0c',
        ink2: '#2e2e2e',
        border: '#e6e6e6',
        primary: '#000000',
        muted: '#8f8a8a',
        cream: '#fdfcf9',
        tan: 'rgb(213,189,163)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        tc: ['var(--font-noto-tc)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
