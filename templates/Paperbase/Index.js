import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { theme } from './Style';
import Header from './Header';
import Navigator from './Navigator';
import Footer from './Footer';

const Index = (props) => {
  const { children } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />

      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <Box component="nav" sx={{ width: { lg: 256 }, flexShrink: { lg: 0 } }}>
          {isLgUp ? null : (
            <Navigator
              PaperProps={{ style: { width: 256 } }}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
            />
          )}
          <Navigator
            PaperProps={{ style: { width: 256 } }}
            sx={{ display: { lg: 'block', xs: 'none' } }}
          />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Header onDrawerToggle={handleDrawerToggle} />
          <Box
            component="main"
            sx={{ flex: 1, py: { lg: 3, xs: 1 }, px: { lg: 4, xs: 1 }, bgcolor: '#eaeff' }}
          >
            {/* begin content */}
            <div style={{ margin: 'auto', overflow: 'hidden' }}>
              <AppBar position="static" color="default" elevation={0}></AppBar>
              <Toolbar sx={{ m: 1, p: { lg: 1, xs: 0.5 } }}>{children}</Toolbar>
            </div>
            {/* end content */}
          </Box>
          <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
            <Footer />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Index;
