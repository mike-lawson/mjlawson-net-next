const defaultTheme = require('tailwindcss/defaultTheme');
const mdx = require('@mdx-js/mdx');

module.exports = {
  purge: {
    content: [
      './src/pages/**/*.tsx',
      './src/components/**/*.tsx',
      './next.config.js',
      './src/styles/**/*.css',
    ],
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        code: {
          green: '#b5f4a5',
          yellow: '#ffe484',
          purple: '#ffe484',
          red: '#ff8383',
          blue: '#93ddfd',
          white: '#fff',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            strong: {
              color: '#111827',
              fontWeight: '600',
              fontSize: '96.5%',
            },
            code: {
              color: 'rgb(146 41 37)',
              backgroundColor: 'rgba(254, 243, 199)',
              padding: '0 3px',
              fontWeight: 600,
              fontSize: '1rem',
            },
            'code::before': false,
            'code::after': false,
          },
        },
      },
    },
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'active'],
  },
  plugins: [require('@tailwindcss/typography')],
};
