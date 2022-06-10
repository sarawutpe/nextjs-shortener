import React, { useEffect } from 'react';
import Container from '@mui/material/Container';
import useUser from '@/hoc/useUser';
import MuiBackdrop from 'components/MuiBackdrop';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/redux/features/authSlice';

const Admin = () => {
  const { user } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {}, [

  ]);

  if (user?.auth) {
    return (
      <>
        <Container style={{ border: '1px solid #000' }}>{JSON.stringify(user)}</Container>

        <button onClick={() => dispatch(logout())}>Logout</button>
      </>
    );
  }
  return <></>;
};

export default Admin;
