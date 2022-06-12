import React, { useEffect } from 'react';
import { withIronSessionSsr } from 'iron-session/next';
import { sessionOptions } from '@/hoc/sessionOptions';

const Logout = () => {
  useEffect(() => {
    const page = '/login';
    window.location.href = page;
  }, []);

  return <></>;
};

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps({ req }) {
  const user = req.session.user;
  // if user logged in
  if (user?.auth) {
    req.session.destroy();
  } else {
    return {
      notFound: true,
    };
  }
  return {
    props: {}, // will be passed to the page component as props
  };
}, sessionOptions);

export default Logout;
