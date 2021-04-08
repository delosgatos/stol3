module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      /*xxs: '320px',*/
      /* xs: '414px', */
      sm: '567px',
      /*sm: '640px',*/
      md: '768px',
      /*land: '976px',*/
      lg: '1024px',
      xl: '1280px',
      lt: '1366px',
      /* 
      xxl: '1440px',
      '3xl': '1536px',
      '4xl': '1600px', 
      'hd': '1920px',*/
    },
    /* colors: {
    }, */
    fontFamily: {
      sans: ['HelveticaMonospacedW1G-Rg', 'sans-serif'],
      /* serif: ['Georgia', 'serif'], */
    },
    extend: {
      colors: {
        gray: {
          910: 'rgba(31,31,31,0.9)',
          900: 'rgba(31,31,31,1)',
          300: 'rgba(235,235,235,1)'
        },
        orange: {
          900: 'rgba(255,75,0, 1)',
          600: 'rgba(255,75,0, 0.6)',
        },
      },
      fontSize: {
        base: ['0.9em',{letterSpacing: '-0.8px', lineHeight: '1.5em'}],
        dh1:  ['36px', {lineHeight:'1.3em'}],
        d:    ['16px', {lineHeight:'1.48em'}],
        dcap: ['16px', {lineHeight:'1.44em'}],
        dh2:  ['22px', {lineHeight:'1.40em'}],
        dh3:  ['16px', {lineHeight:'1.44em'}],
        dtag: ['14px', {lineHeight:'1em'}],

        th1:  ['26px', {lineHeight:'1.30em'}],
        th2:  ['18px', {lineHeight:'1.20em'}],
        th3:  ['14px', {lineHeight:'1.44em'}],
        t:    ['14px', {lineHeight:'1.48em'}],
        tcap: ['14px', {lineHeight:'1.49em'}],
        ttag: ['12px', {lineHeight:'28px'}],

        mh1:  ['22px', {lineHeight:'1.3em'}],
        mh2:  ['18px', {lineHeight:'1.2em'}],
        mh3:  ['14px', {lineHeight:'1.44em'}],
        m:    ['14px', {lineHeight:'1.49em'}],
        mcap: ['14px', {lineHeight:'1.48em'}],
      },
      spacing: {
        4.5: '1.125rem',
        5.5: '1.357rem',
        6.5: '1.625rem',
        13: '3.25rem',
        15: '3.75rem',
        17: '4.25rem',
        18: '4.5rem',
        19: '4.75rem',
        21: '5.25rem',
        22: '5.5rem',
        23: '5.75rem',
        25: '6.25rem',
        26: '6.5rem',
        27: '6.75rem',
        128: '32rem',
        144: '36rem',
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
        15: '3.75rem',
        16: '4rem',
        17: '4.25rem',
        18: '4.5rem',
        19: '4.75rem',
        20: '5rem',
        21: '5.25rem',
        22: '5.5rem',
        23: '5.75rem',
        24: '6rem',
        25: '6.25rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}