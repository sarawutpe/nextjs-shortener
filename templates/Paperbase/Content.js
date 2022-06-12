import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const Content = (props) => {
  const { children } = props;
  return (
    <div style={{ margin: 'auto', overflow: 'hidden' }}>
      <AppBar position="static" color="default" elevation={0}></AppBar>
      <Toolbar sx={{ m: 2, border: '1px solid #000' }}></Toolbar>
    </div>
  );
};

export default Content;
