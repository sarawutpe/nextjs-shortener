import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from '@/styles/Home.module.css';
import Container from '@mui/material/Container';
const Main = ({ children }) => {
  return (
    <>
      <Container className={styles.main}>
        {children}
      </Container>
    </>
  );
};

export default Main;
