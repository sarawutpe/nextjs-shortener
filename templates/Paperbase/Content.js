import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const Content = (props) => {
  const { children } = props;
  return (
    <div style={{ margin: 'auto', overflow: 'hidden', }}>
      <AppBar position="static" color="default" elevation={0}></AppBar>
      <Toolbar>{children}</Toolbar>
    </div>
  );
};

export default Content;
