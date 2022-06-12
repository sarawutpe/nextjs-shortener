import React, { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { login } from '@/redux/features/authSlice';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import useUser from '@/hoc/useUser';
import AuthTemplate from '@/templates/Auth/Index';

const Login = () => {
  const { user, error } = useUser();
  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validate: (values) => {
      const errors = {};
      if (!values.username) {
        errors.username = 'Required';
      }
      if (!values.password) {
        errors.password = 'Required';
      }
      return errors;
    },
    onSubmit: async (values, { setFieldValue }) => {
      const data = {
        username: values.username.trim(),
        password: values.password.trim(),
      };
      const res = await dispatch(login(data));
      // alert
      if (!res?.payload?.ok) {
        toast.error(res?.payload?.data);
      }
    },
  });

  useEffect(() => {
    // redirect if user is logged in
    if (user?.isLoggedIn) {
      router.push('/admin');
    }
  }, [user]);

  if (error) return <div>failed to load</div>;
  if (!user) return <></>;
  return (
    <AuthTemplate>
      <Head>
        <title>Login</title>
      </Head>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box my={1}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <AdminPanelSettingsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              type="text"
              variant="filled"
              label="Username"
              margin="none"
              name="username"
              fullWidth
              value={formik.values.username}
              error={formik.touched.username && Boolean(formik.errors.username)}
              helperText={formik.touched.username && formik.errors.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <TextField
              type="password"
              variant="filled"
              label="Password"
              margin="none"
              name="password"
              fullWidth
              value={formik.values.password}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Login
            </Button>
          </form>
        </Box>
      </Container>
    </AuthTemplate>
  );
};

export default Login;
