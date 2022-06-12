import React from 'react';
import httpClient from 'utils/HttpClient';

const RedirectPage = () => {
  return <></>;
};

export async function getServerSideProps(context) {
  const link = context.query.redirectPage;
  const { data } = await httpClient.get(`/link/short_link/${link}`);
  // short link is valid
  if (data?.ok) {
    const link = data?.data?.link ?? '';
    return {
      redirect: {
        destination: link,
        permanent: false,
      },
    };
  }
  // short link is invalid
  return {
    notFound: true,
  };
}

export default RedirectPage;
