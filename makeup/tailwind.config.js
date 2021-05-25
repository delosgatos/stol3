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
          900: '#1f1f1f',
          200: '#ebebeb'
        },
        orange: {
          900: '#FF4b00',
          600: '#FF9366',
        },
      },
      fontSize: {
        xxs:  ['0.52em'],
        base: ['0.9em',{letterSpacing: '-0.8px', lineHeight: '1.5em'}],
        dh0:  ['52px', {lineHeight:'130%'}],
        dh1:  ['36px', {lineHeight:'130%'}],
        d:    ['16px', {lineHeight:'148%'}],
        dcap: ['16px', {lineHeight:'144%'}],
        dh2:  ['22px', {lineHeight:'140%'}],
        dh3:  ['16px', {lineHeight:'144%'}],
        dtag: ['14px', {lineHeight:'18px'}],
        dtext:['18px',{lineHeight:'154%'}],

        th0:  ['32px', {lineHeight:'138%'}],
        th1:  ['26px', {lineHeight:'130%'}],
        th2:  ['18px', {lineHeight:'120%'}],
        th3:  ['14px', {lineHeight:'144%'}],
        t:    ['14px', {lineHeight:'148%'}],
        tcap: ['14px', {lineHeight:'149%'}],
        ttag: ['12px', {lineHeight:'16px'}],
        ttext:['16px',{lineHeight:'154%'}],

        mh0:  ['22px', {lineHeight:'130%'}],
        mh1:  ['22px', {lineHeight:'130%'}],
        mh2:  ['18px', {lineHeight:'120%'}],
        'mh2.5':['16px', {lineHeight:'148%'}],
        mh3:  ['14px', {lineHeight:'144%'}],
        m:    ['14px', {lineHeight:'149%'}],
        mcap: ['14px', {lineHeight:'148%'}],
        mtag: ['12px', {lineHeight:'14px'}],

        mtext:['16px',{lineHeight:'154%'}],
        
        t10: ['10px', {lineHeight:'100%'}],
        't8.5': ['8.5px', {lineHeight:'100%'}],
      },
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
        6.5: '1.625rem',
        7.5: '1.875rem',
        8.5: '2.125rem',
        13: '3.25rem',
        15: '3.75rem',
        16.5: '4.125rem',
        17: '4.25rem',
        17.5: '4.375rem',
        18: '4.5rem',
        18.5: '4.625rem',
        19: '4.75rem',
        21: '5.25rem',
        22: '5.5rem',
        23: '5.75rem',
        25: '6.25rem',
        26: '6.5rem',
        27: '6.75rem',
        28: '7rem',
        29: '7.25rem',
        30: '7.5rem',
        32.5: '8.125rem',
        33: '8.25rem',
        34: '8.5rem',
        34.5: '8.62 5rem',
        35: '8.75rem',
        36: '9rem',
        37: '9.25rem',
        38: '9.5rem',
        39: '9.75rem',
        40: '10rem',
        128: '32rem',
        144: '36rem',
        '1/5': '20%',
        '1/6': '16.67%',
        '1/7': '14.29%',
        '1/8': '12.5%',
        'auto': 'auto',
        '4px': '4px',
        '5px': '5px',
        '6px': '6px',
        '7px': '7px',
        '8px': '8px',
        '9px': '9px',
        'sm-head': '47px',
        'xl-head': '96px',
        '137px': '137px',
        
        'h-teaser-img': '180px',

        'img-long-w-d':   '171px',
        'img-long-w-t':   '181px',

        'img-long-h-d':  '166px',
        'img-long-h-t':  '176px',
        'img-long-h-m':  '294px',

        mgal:             '214px',
        tgal:             '487px',
        dgal:             '676px',
        biground:         '148px',
        'biground-t':     '311px',
        'biground-d':     '305px',


        'w-hair':         '0.05vw',
        'h-hair':         '0.05vh',
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
        26: '6.5rem',
        27: '6.75rem',
        28: '7rem',
        29: '7.25rem',
        30: '7.5rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      width: {
        'dmenu':        '440px',
        'screen-3/2':   '150%',
        'right-column': '365px',
        'main-column':  'calc(100% - 365px)',
        'full+6':       'calc(100% + 1.5rem)',
        'full+10':      'calc(100% + 2.5rem)',
        'full+18':      'calc(100% + 4.5rem)',
      },
      maxWidth: {
        '8xl':          '90rem'   /* 1440px */,
        '9xl':          '100rem'  /* 1600px */,
        '10xl':         '120rem'  /* 1920px */,
        'xl-button':    '289px',
        'l-button':     '250px',
        'modal':        '298px',
      },
      maxHeight: {
        'none':         'none',
      },
      minHeight: {
        'promo':         '500px',
        mtop:           '223px',
        ttop:           '460px',
        dtop:           '567px',
        dtop1:          '568px',
      },
      height: {
        
        mtop:           '223px',
        ttop:           '460px',
        dtop:           '567px',
        dtop1:          '568px',

        mteas:          '294px',
        tteas:          '400px',
        dteas:          '316px',
        
        mfeat:          '180px',
        tfeat:          '214px',
        dfeat:          '300px',

        mfoto:          '214px',
        tfoto:          '487px',
        dfoto:          '674px',

        rslide:         '420px',
        
        mvideo:         '180px',
        tvideo:         '410px',
        dvideo:         '570px',

        mgal:           '214px',
        tgal:           '487px',
        dgal:           '676px',

      },
      flex: {
        full: '2 1 100%',
        fix: '0 0 auto',
        0: '0 1 0%',
      },
      blur: {
        1: '1px',
      },
      grayscale: {
        sm: '30%',
        md: '50%',
        lg: '70%',
      }
    },
  },
  variants: {
    extend: {
      'margin': ['last'],
      'padding': ['last'],
    },
  },
  plugins: [],
}