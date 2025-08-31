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
        'win98': {
          face: '#d5d2c9',
          light: '#ffffff',
          shadow: '#808080',
          dark: '#000000',
          gray: '#dcdcdc',
          titlebar: '#000080',
          titlebar2: '#1e4e8c',
          titlebar3: '#3a6ea5',
          selected: '#fff8dc',
          playing: '#fff8dc',
          bg: '#c0c0c0'
        }
      },
      fontFamily: {
        'win98': ['Tahoma', 'MS Sans Serif', 'sans-serif'],
      },
      boxShadow: {
        'win98-raised': 'inset 1px 1px 0 #ffffff, inset -1px -1px 0 #000000',
        'win98-sunken': 'inset 1px 1px 0 #ffffff, inset -1px -1px 0 #000000',
        'win98-pressed': 'inset -1px -1px 0 #ffffff, inset 1px 1px 0 #000000',
        'win98-window': '2px 2px 0 #000000',
        'win98-titlebar': 'linear-gradient(90deg, #000080 0%, #1e4e8c 45%, #3a6ea5 100%)'
      },
      fontSize: {
        'win98': '12px',
      },
      height: {
        'win98-input': '22px',
        'win98-btn': '24px',
        'win98-titlebar': '19px',
        'win98-menubar': '18px',
      },
      width: {
        'win98-scrollbar': '16px',
      }
    },
  },
  plugins: [
    function({ addUtilities }: any) {
      const newUtilities = {
        '.win98-btn': {
          'background-color': '#d4d0c8',
          'border': '1px solid #808080',
          'box-shadow': 'inset 1px 1px 0 #ffffff, inset -1px -1px 0 #000000',
          'font-size': '12px',
          'height': '24px',
          'display': 'inline-flex',
          'align-items': 'center',
          'justify-content': 'center',
          'gap': '6px',
          'padding': '0 6px',
          'font-family': 'Tahoma, "MS Sans Serif", sans-serif',
          'color': '#000000',
          'outline': 'none',
          'box-sizing': 'border-box',
        },
        '.win98-btn:active': {
          'transform': 'translate(1px, 1px)',
          'box-shadow': 'inset -1px -1px 0 #ffffff, inset 1px 1px 0 #000000',
        },
        '.win98-btn:disabled': {
          'color': '#808080',
          'text-shadow': '1px 1px 0 #fff',
          'filter': 'grayscale(100%)',
        },
        '.win98-btn.active': {
          'background-color': '#c0c0c0',
          'box-shadow': 'inset 1px 1px 0 #000000, inset -1px -1px 0 #808080',
          'transform': 'translate(1px, 1px)',
        },
        '.win98-input': {
          'background': '#ffffff',
          'height': '22px',
          'padding': '0 6px',
          'font-size': '12px',
          'font-family': 'Tahoma, "MS Sans Serif", sans-serif',
          'border': '1px solid #808080',
          'box-shadow': 'inset 1px 1px 0 #ffffff, inset -1px -1px 0 #000000',
        },
        '.win98-input:focus': {
          'outline': 'none',
        },
        '.win98-input:disabled': {
          'background': '#eee',
          'color': '#808080',
          'text-shadow': '1px 1px 0 #fff',
        },
        '.win98-titlebar': {
          'height': '19px',
          'background': 'linear-gradient(90deg, #000080 0%, #1e4e8c 45%, #3a6ea5 100%)',
          'color': '#ffffff',
          'padding': '0 6px',
          'font-weight': '600',
          'font-size': '12px',
          'display': 'flex',
          'align-items': 'center',
          'justify-content': 'space-between',
        },
        '.win98-menubar': {
          'height': '18px',
          'background-color': '#d4d0c8',
          'display': 'flex',
          'align-items': 'center',
          'gap': '14px',
          'padding': '0 6px',
          'font-size': '12px',
        },
        '.win98-window': {
          'width': '100vw !important',
          'height': '100vh !important',
          'background-color': '#d4d0c8',
          'box-shadow': '2px 2px 0 #000000',
          'border': '1px solid #000000',
          'display': 'flex',
          'flex-direction': 'column',
          'position': 'fixed',
          'top': '0 !important',
          'left': '0 !important',
          'overflow': 'hidden',
          'margin': '0 !important',
          'padding': '0 !important',
        },
        '.win98-table-header': {
          'position': 'sticky',
          'top': '0',
          'z-index': '10',
          'background-color': '#d4d0c8',
          'height': '19px',
          'font-weight': '400',
          'font-size': '12px',
          'text-align': 'left',
          'padding': '0 6px',
          'border': '1px solid #808080',
          'box-shadow': 'inset 1px 1px 0 #ffffff, inset -1px -1px 0 #000000',
          'font-family': 'Tahoma, "MS Sans Serif", sans-serif',
          'color': '#000000',
          'white-space': 'nowrap',
          'overflow': 'hidden',
          'text-overflow': 'ellipsis',
        },
        '.win98-table-header-center': {
          'position': 'sticky',
          'top': '0',
          'z-index': '10',
          'background-color': '#d4d0c8',
          'height': '19px',
          'font-weight': '400',
          'font-size': '12px',
          'text-align': 'center',
          'padding': '0 6px',
          'border': '1px solid #808080',
          'box-shadow': 'inset 1px 1px 0 #ffffff, inset -1px -1px 0 #000000',
          'font-family': 'Tahoma, "MS Sans Serif", sans-serif',
          'color': '#000000',
          'white-space': 'nowrap',
          'overflow': 'hidden',
          'text-overflow': 'ellipsis',
        },
        '.win98-table-row': {
          'height': '18px',
          'line-height': '18px',
          'font-size': '12px',
          'padding': '0 6px',
          'border-bottom': 'none',
          'font-family': 'Tahoma, "MS Sans Serif", sans-serif',
          'white-space': 'nowrap',
          'overflow': 'hidden',
          'text-overflow': 'ellipsis',
        },
        '.win98-table-cell-center': {
          'height': '18px',
          'line-height': '18px',
          'font-size': '12px',
          'padding': '0 6px',
          'border-bottom': 'none',
          'font-family': 'Tahoma, "MS Sans Serif", sans-serif',
          'white-space': 'nowrap',
          'overflow': 'hidden',
          'text-overflow': 'ellipsis',
          'text-align': 'center',
        },
        '.win98-table-row:nth-child(even)': {
          'background-color': '#f6f6f6',
        },
        '.win98-table-row.playing': {
          'background-color': '#fff8dc',
        },
        '.win98-scrollbar': {
          'scrollbar-width': 'auto',
          'scrollbar-color': '#808080 #d4d0c8',
        },
        '.win98-scrollbar::-webkit-scrollbar': {
          'width': '16px',
          'background': '#d4d0c8',
        },
        '.win98-scrollbar::-webkit-scrollbar-track': {
          'background': '#d4d0c8',
          'border': '1px solid #000000',
          'box-shadow': 'inset 1px 1px 0 #ffffff, inset -1px -1px 0 #000000',
        },
        '.win98-scrollbar::-webkit-scrollbar-thumb': {
          'background': '#808080',
          'border': '1px solid #000000',
          'box-shadow': 'inset 1px 1px 0 #ffffff, inset -1px -1px 0 #000000',
          'min-height': '28px',
        },
        '.win98-scrollbar::-webkit-scrollbar-button': {
          'width': '16px',
          'height': '16px',
          'background': '#d4d0c8',
          'border': '1px solid #000000',
          'box-shadow': 'inset 1px 1px 0 #ffffff, inset -1px -1px 0 #000000',
          'background-repeat': 'no-repeat',
          'background-position': 'center',
          'background-size': '10px 10px',
        },
        '.win98-scrollbar::-webkit-scrollbar-button:vertical:decrement': {
          'background-image': 'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"16\\" height=\\"16\\"><polygon points=\\"4,11 8,6 12,11\\" fill=\\"black\\"/></svg>")',
        },
        '.win98-scrollbar::-webkit-scrollbar-button:vertical:increment': {
          'background-image': 'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"16\\" height=\\"16\\"><polygon points=\\"4,6 8,11 12,6\\" fill=\\"black\\"/></svg>")',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}
export default config
