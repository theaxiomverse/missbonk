import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      fontFamily: {
        'degen': ['Industry', 'Orbitron', 'Rajdhani', 'sans-serif']
      },
    },
  },
  plugins: [],
} satisfies Config 