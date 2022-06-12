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
import { updatePassword } from '@/redux/features/userSlice';
import AdminTemplate from '@/templates/Paperbase/Index';

const ChangePassword = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const router = useRouter;

  const getUserState = useSelector((state) => state.user.getUserState);

  useEffect(() => {
    // dispatch(getUser({ id: user?.id }));
  }, [dispatch, router]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.current_password) {
        errors.current_password = 'Required';
      }
      if (!values.new_password) {
        errors.new_password = 'Required';
      }
      if (!values.confirm_password) {
        errors.confirm_password = 'Required';
      }
      if (values.new_password != values.confirm_password) {
        errors.new_password = true;
        errors.confirm_password = 'Password do not match';
      }
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      const data = {
        id: user?.id,
        currentPassword: values.current_password,
        newPassword: values.new_password,
      };
      const res = await dispatch(updatePassword(data));
      // alert
      if (res?.payload?.ok) {
        toast.success(res?.payload?.data);
      } else {
        toast.error(res?.payload?.data);
      }
      resetForm();
    },
  });

  if (user?.auth) {
    return (
      <AdminTemplate>
        <Head>
          <title>Admin | Change Password</title>
        </Head>
        <Box sx={{ width: '100%' }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              type="password"
              variant="filled"
              label="Current"
              margin="none"
              name="current_password"
              fullWidth
              value={formik.values.current_password}
              error={formik.touched.current_password && Boolean(formik.errors.current_password)}
              helperText={formik.touched.current_password && formik.errors.current_password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TextField
              type="password"
              variant="filled"
              label="New"
              margin="none"
              name="new_password"
              fullWidth
              value={formik.values.new_password}
              error={formik.touched.new_password && Boolean(formik.errors.new_password)}
              helperText={formik.touched.new_password && formik.errors.new_password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TextField
              type="password"
              variant="filled"
              label="Re-type new"
              margin="none"
              name="confirm_password"
              fullWidth
              value={formik.values.confirm_password}
              error={formik.touched.confirm_password && Boolean(formik.errors.confirm_password)}
              helperText={formik.touched.confirm_password && formik.errors.confirm_password}
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

export default ChangePassword;
