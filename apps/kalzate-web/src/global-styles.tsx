import { createGlobalStyle } from 'styled-components';
import 'sanitize.css/sanitize.css';

const GlobalStyle = createGlobalStyle`

  html,
  body {
    height: 100vh;
    width: 100vh;
    overflow: hidden;
  }

  body {
    font-family: 'BlinkMacSystemFont', 'Lucida Grande', 'Segoe UI', Ubuntu, Cantarell, Arial, sans-serif;
    font-weight: normal;
  }

  body.fontLoaded {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  }

  #root {
    font-size: 11px;
    min-height: 100vh;
    min-width: 100vh;
  }
`;

export default GlobalStyle;
