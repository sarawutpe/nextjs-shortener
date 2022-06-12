import { createTheme } from '@mui/material/styles';
import { theme } from './Paperbase/Style';

let globalTheme = createTheme(theme, {
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#2e7d32',
    },
  },
  typography: {
    fontFamily: ['Roboto'].join(','),
    h1: {
      fontSize: '6rem',
      [theme.breakpoints.down('md')]: {
        fontSize: '4rem',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '3rem',
      },
    },
    h2: {
      fontSize: '3.75rem',
      [theme.breakpoints.down('md')]: {
        fontSize: '2.8rem',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '2.8rem',
      },
    },
    h3: {
      fontSize: '3rem',
      [theme.breakpoints.down('md')]: {
        fontSize: '2.6rem',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '2.5rem',
      },
    },
    h4: {
      fontSize: '2.125rem',
      [theme.breakpoints.down('md')]: {
        fontSize: '1.9rem',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.7rem',
      },
    },
    h5: {
      fontSize: '1.5rem',
      [theme.breakpoints.down('md')]: {
        fontSize: '1.37rem',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.25rem',
      },
    },
    h6: {
      fontSize: '1.25rem',
      [theme.breakpoints.down('md')]: {
        fontSize: '1.2rem',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.1rem',
      },
    },
  },
});

export default globalTheme;
