import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useUser from '@/hoc/useUser';
import { getUser, updateUser } from '@/redux/features/userSlice';
import AdminTemplate from '@/templates/Paperbase/Index';

const Profile = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const router = useRouter;

  const getUserState = useSelector((state) => state?.user?.getUserState);

  useEffect(() => {
    dispatch(getUser({ id: user?.id }));
  }, [dispatch, router, user]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: getUserState?.data?.username ?? '',
      name: getUserState?.data?.name ?? '',
      email: getUserState?.data?.email ?? '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.username) {
        errors.username = 'Required';
      }
      if (!values.name) {
        errors.name = 'Required';
      }
      if (!values.email) {
        errors.email = 'Required';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
      }
      return errors;
    },
    onSubmit: async (values) => {
      const data = {
        id: user?.id,
        username: values.username,
        name: values.name,
        email: values.email,
      };
      const res = await dispatch(updateUser(data));
      // alert
      if (res?.payload?.ok) {
        toast.success(res?.payload?.data);
      }
    },
  });

  if (user?.auth) {
    return (
      <AdminTemplate>
        <Head>
          <title>Admin | Profile</title>
        </Head>
        <Box sx={{ width: '100%' }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              type="text"
              variant="filled"
              label="Username"
              margin="none"
              name="username"
              fullWidth
              value={formik.values.username}
              error={formik.touched.username && formik.errors.username}
              helperText={formik.touched.username && formik.errors.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TextField
              type="text"
              variant="filled"
              label="Name"
              margin="none"
              name="name"
              fullWidth
              value={formik.values.name}
              error={formik.touched.name && formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TextField
              type="text"
              variant="filled"
              label="Email"
              margin="none"
              name="email"
              fullWidth
              value={formik.values.email}
              error={formik.touched.email && formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Stack my={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                บันทึก
              </Button>
            </Stack>
          </form>
        </Box>
      </AdminTemplate>
    );
  }
  return <></>;
};

export default Profile;
