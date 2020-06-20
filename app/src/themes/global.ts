import { createGlobalStyle, css } from 'styled-components';

const global = {
  aspectRatio: {
    iPhone5: '40/71',
    iPad: '3/4',
  },
  borderRadius : '2.5vh',
  mobile: {
    endPixels: 768,
  },
  desktop: {
    startPixels: 769,
  },
  colour: {
    whiteText: '#FFFFFF',
    blackText: '#000000',
    lightGreyText: '#888888',
    darkGrey: '#333333',
    lightGrey: '#999999',
    veryLightGrey: '#dddddd',
    brightRed: '#ff3333',
    darkRed: '#cc3333',
    blurBackground: '#333',
  },
  fonts: {
    body: {
      family: "'Nunito', serif;",
    },
    title: {
      family: "'Playfair Display', serif;",
      normal: 400,
      bold: 700,
      black: 900,
    },
  },
  components: {
    circle : {
      width: {
        vm : '65vmin',
        pixels: '400px',
      },
    },
    imageReveal : {
      width : {
        vm: '32.5vmin',
        pixels: '200px',
      },
    },
  },
};

const GlobalStyles = createGlobalStyle`

  /* Fonts */
  @import url('https://fonts.googleapis.com/css?family=Nunito:300,400');
  @import url('https://fonts.googleapis.com/css?family=Playfair+Display:400,700,900&display=swap');

  /* Animation keyframes */
  @keyframes fadeInOpacity {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 1;
      transform:translateY(0);
    }
  }
  @keyframes slideDownMenu {
    0% {
      top: -100vh;
    }
    100% {
      top: 0;
    }
  }

  /* Reset */
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    line-height: 1;
    box-sizing: border-box;
  }
  input[type="button" i], input[type="submit" i], input[type="reset" i],
  input[type="file" i]::-webkit-file-upload-button, button {
    background-color: transparent;
  }

  /* Text areas */
  input[type="text"], input[type="email"], input[type="password"], textarea {
    font-family: 'Nunito', sans-serif;
    width: 100%;
    max-width: 95%;
    background: white;
    border: none;
    box-sizing: border-box;
    border-radius: 0.5rem;
    box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.4);
    padding: 3vw;
    text-align: center;
    @media (min-width: ${global.desktop.startPixels}px) {
      padding: 20px;
    }
  }

  /* Single line inputs */
  input[type="text"], input[type="email"], input[type="password"] {
    margin-bottom: 2vh;
  }

  /* Global styles */
  html {
    background-color: #333;
    margin: 0 auto;
    /* Limit the maximum width of all screens */
    /* Desktop */
    @media (min-width: ${global.desktop.startPixels}px) {
      /* Force a mobile like aspect ratio */
      max-width: 60vh; /* Force aspect ratio */
    }
  }

  body {
    font-family: 'Nunito', sans-serif;
    background-color: ${global.colour.darkGrey};
    color: black;
    -webkit-font-smoothing: antialiased;
    max-width: ${global.mobile.endPixels}px;
    margin: 0 auto;
  }

  /* Reset anchors to allow components to style */
  a {
    color: inherit;
    text-decoration: none;
  }

  h1, h2 {
   font-family: ${global.fonts.title.family};
   font-weight: ${global.fonts.title.bold};
   margin-bottom: 1em;
  }

  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.5em;
  }

  h5 {
    font-weight: 700;
    margin-bottom: 0.7vh;
  }

  p {
    margin-bottom: 1em;
  }

  button {
    padding: 0;
    border: none;
    cursor: pointer;
  }

`;

// Animations
const fadeInUp = css`
  opacity: 1;
  animation-name: fadeInOpacity;
  animation-iteration-count: 1;
  animation-timing-function: ease-in;
  animation-duration: 0.2s;
`;

const slideDownMenu = css`
  transition-duration: 1.5s;
  animation-timing-function: ease-out;
  animation: slideDownMenu 0.2s forwards;
`;

// Convert a decimal number to a roman numeral
function romanNumeralFromDecimal(decimal: number) {
  switch (decimal) {
    case 1 :
      return 'I';
    case 2 :
      return 'II';
    case 3 :
      return 'III';
    default :
      return 'not done';
  }
}

// Convert given text size to a font size, for mobile
function calcMobileTextSize( size: number ) {
  return ( size / 10 ).toFixed(1);
}

// Convert given text size to a font size, for desktop
function calcDesktopTextSize( size: number ) {
  return ( size * 3.8 ).toFixed(1);
}

export {
  GlobalStyles,
  fadeInUp,
  slideDownMenu,
  global,
  romanNumeralFromDecimal,
  calcMobileTextSize,
  calcDesktopTextSize,
};
