import '../styles/globals.css';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material';
import theme from '@/templates/theme';
import { SWRConfig, useSWR } from 'swr';
import fetchJson from 'hoc/fetchJson';

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <SWRConfig
        value={{
          fetcher: fetchJson,
          onError: (err) => {
            console.error(err);
          },
        }}
      >
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ThemeProvider>
      </SWRConfig>
    </>
  );
};

export default MyApp;
