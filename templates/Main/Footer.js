import React from 'react';
import Typography from '@mui/material/Typography';
import styles from '@/styles/Home.module.css';

const Footer = () => {
  return (
    <>
      <div className={styles.divider}></div>
      <div className={styles.footer}>
        <Typography variant="subtitle1">© {new Date().getUTCFullYear()} - Free URL Shortener</Typography>
      </div>
    </>
  );
};

export default Footer;
