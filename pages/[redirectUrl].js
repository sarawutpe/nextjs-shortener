import React from 'react';
import httpClient from 'utils/HttpClient';

const RedirectUrl = () => {
  return <></>;
};

export async function getServerSideProps(context) {
  const url = context.query.redirectUrl;
  const { data } = await httpClient.get(`/url/short_url/${url}`);
  // short url is valid
  if (data?.ok) {
    const url = data?.data?.url ?? '';
    return {
      redirect: {
        destination: url,
        permanent: false,
      },
    };
  }
  // short url is invalid
  return {
    notFound: true,
  };
}

export default RedirectUrl;
