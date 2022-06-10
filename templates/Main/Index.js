import React from 'react';
import styles from '@/styles/Home.module.css';
import Container from '@mui/material/Container';
import Header from '@/templates/Main/Header';
import Footer from '@/templates/Main/Footer';

const Main = ({ children }) => {
  return (
    <>
      <Header />
      <Container className={styles.main}>{children}</Container>
      <Footer />
    </>
  );
};

export default Main;
