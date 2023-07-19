import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}
  *{
    box-sizing: border-box;

  }
  body {
   color:${(props) => props.theme.colors.white.darker};
   background-color:black;
  }
  a{
    color:inherit;
    text-decoration: none;
  }
`;
