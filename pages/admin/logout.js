import React from 'react';
import axios from 'axios';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '@/hoc/sessionOptions';

const Logout = () => {
  return <></>;
};

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req }) {
  const user = req.session.user;
  // if user logged in
  if (user?.auth) {
    req.session.destroy();
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    notFound: true,
  };
}, sessionOptions);

export default Logout;
