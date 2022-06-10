import * as React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import HelpIcon from '@mui/icons-material/Help';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { categories } from './Configure';

const Header = (props) => {
  const { onDrawerToggle } = props;
  const router = useRouter();

  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <>
      {/* hamburger menu */}
      {isSmUp ? null : (
        <AppBar color="primary" position="sticky" elevation={0}>
          <Toolbar>
            <Grid container spacing={1} alignItems="center">
              <Grid sx={{ display: { sm: 'none', xs: 'block' } }} item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  edge="start"
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      )}
      {/* header  */}
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ pt: isSmUp ? 1 : 0, zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              {/* show id */}
              {categories.map(({ children }) =>
                children.map((row, index) => {
                  if (row.path === router.pathname)
                    return (
                      <Typography key={index} color="inherit" variant="h5" component="h1">
                        {row.id}
                      </Typography>
                    );
                })
              )}
            </Grid>
            <Grid item>
              <Tooltip title="Help">
                <IconButton color="inherit">
                  <HelpIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
