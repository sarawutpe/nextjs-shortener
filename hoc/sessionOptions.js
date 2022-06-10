// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions
export const sessionOptions = {
  cookieName: "session",
  password: 'AanMRGqWMHPiACClXfgXGipbtNkjAwwDnrZplIblRYQpbFIbMx',
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

