import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
    --color-grey-900: #1a1a18;
    --color-grey-800: #353431;
    --color-grey-700: #4f4d49;
    --color-grey-600: #6a6762;
    --color-grey-500: #84817a;
    --color-grey-400: #9d9a95;
    --color-grey-300: #b5b3af;
    --color-grey-200: #cecdca;
    --color-grey-100: #e6e6e4;
    --color-grey-50: #f3f2f2;
    --color-grey-0: #ffffff;



    --color-violet-900: #090911;
    --color-violet-800: #121222;
    --color-violet-700: #1a1a32;
    --color-violet-600: #232343;
    --color-violet-500: #2c2c54;
    --color-violet-400: #565676;
    --color-violet-300: #808098;
    --color-violet-200: #ababbb;
    --color-violet-100: #d5d5dd;
    --color-violet-50: #eaeaee;
    --color-violet-0: #ffffff;

    --color-red-500: #ff5252;


    --color-main-700: #996a28;
    --color-main-600: #cc8e35;
    --color-main-500: #ffb142;
    --color-main-400: #ffc168;  
    --color-main-50: #fff7ec

    --border-radius-tiny: 3px;
    --border-radius-sm: 5px;
    --border-radius-md: 7px;
    --border-radius-lg: 9px;
    --border-radius-xlg: 13px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  min-width: 0;
  }

html {
  font-size: 62.5%;
  

  @media screen and (min-width: 400px) and (min-height: 700px){
    font-size: 75%;
  }

  @media screen and (min-width: 550px) and (min-height: 1000px) {
    font-size: 81.25%;
  } 

  @media screen and (min-width: 700px) and (min-height: 1200px) {
    font-size: 87.5%;
  } 
}

body {
    font-family: 'Play', sans-serif;
    color: var(--color-grey-50);
    background-color: var(--color-violet-800);
    line-height: 1.5;
    font-size: 1.6rem;
    height: 100vh;

    
  }

  ul {
  list-style: none;
}
  `;

export default GlobalStyle;
