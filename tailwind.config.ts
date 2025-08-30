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
        'win98-bg': '#c0c0c0',
        'win98-window': '#e0e0e0',
        'win98-titlebar': '#000080',
        'win98-button': '#dcdcdc',
        'win98-selected': '#fff8dc',
      },
      fontFamily: {
        'win98': ['Tahoma', 'MS Sans Serif', 'sans-serif'],
      },
      boxShadow: {
        'win98': '2px 2px 0px rgba(0, 0, 0, 0.3)',
        'win98-inset': 'inset 1px 1px 0px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
export default config
