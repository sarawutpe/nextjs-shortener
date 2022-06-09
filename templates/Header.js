import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from '@/styles/Home.module.css';

const Header = () => {
  return (
    <>
      <div className={styles.header}>
        <Typography variant="h2" align="center">
          Free URL Shortener
        </Typography>
      </div>
    </>
  );
};

export default Header;
