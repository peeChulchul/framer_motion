import { DefaultTheme } from 'styled-components';

interface MyTheme extends DefaultTheme {
    colors: {
        red: string;
        black: {
            veryDark: string;
            darker: string;
            lighter: string;
        };
        white: {
            lighter: string;
            darker: string;
        };
    };
    breakpoints: {
        sm: string;
        md: string;
        lg: string;
    };
}
export const theme: MyTheme = {
    colors: {
        red: '#E51013',
        black: {
            veryDark: '#141414',
            darker: '#181818',
            lighter: '#2F2F2F',
        },
        white: {
            lighter: '#fff',
            darker: '#e5e5e5',
        },
    },
    breakpoints: {
        sm: '480px',
        md: '768px',
        lg: '1024px',
    },
};
