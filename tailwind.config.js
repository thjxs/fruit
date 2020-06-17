const colors = {
  transparent: 'transparent',
  white: '#fff',
  gray: {
    '100': '#f5f5f5',
    '200': '#eeeeee',
    '300': '#e5e5e5',
    '400': '#c6c6c6',
    '500': '#9e9e9e',
    '600': '#757575',
    '700': '#616161',
    '800': '#424242',
    '900': '#212121',
  },
  red: {
    '100': '#675454',
    '200': '#fa5151',
    '700': '#c53030;',
  },
  teal: {
    '300': '#81e6d9',
    '500': '#78d3ca',
  },
  orange: {
    '500': '#ffe51b',
  },
};

const config = {
  theme: {
    colors: colors,
    backgroundColor: colors,
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      dark: { raw: '(prefers-color-scheme: dark)' },
    },
    fontSize: {
      xs: '.75rem', // 12px
      sm: '.875rem', // 14px
      base: '1rem', // 16px
      lg: '1.125rem', // 18px
      xl: '1.25rem', // 20px
      '2xl': '1.5rem', // 24px
      '3xl': '2rem', // 32px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem', // 48px
    },
  },
};

if (process.env.NODE_ENV === 'production') {
  config.purge = ['./app/ui/*.js', './app/*.js'];
}

module.exports = config;
