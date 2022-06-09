import '../styles/globals.css';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from "@mui/material";
import theme from '@/templates/theme';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ThemeProvider>
  );
}

export default MyApp;
