import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '@/redux/features/authSlice';
import { useFormik } from 'formik';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MuiBackdrop from 'components/MuiBackdrop';
import useUser from '@/hoc/useUser';
import axios from 'axios';

const Login = () => {
  const { user, error } = useUser();
  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: 'admin',
      password: '1234',
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
    onSubmit: (values, { setFieldValue }) => {
      const data = {
        username: values.username.trim(),
        password: values.password.trim(),
      };
      dispatch(login(data));
    },
  });

  const [hidePassword, setHidePassword] = useState(false);

  const handleClickShowPassword = () => {
    setHidePassword(!hidePassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    // redirect if user is logged in
    if (user?.isLoggedIn) {
      router.push('/admin');
    }
  }, [user]);

  if (error) return <div>failed to load</div>;
  if (!user) return <></>;
  return (
    <>
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
            <FormControl variant="filled" margin="dense" fullWidth>
              <InputLabel htmlFor="filled-adornment-amount">Username</InputLabel>
              <FilledInput
                type="text"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormHelperText error={formik.touched.username && formik.errors.username}>
                {formik.errors.username}
              </FormHelperText>
            </FormControl>
            <FormControl variant="filled" margin="dense" fullWidth>
              <InputLabel htmlFor="filled-adornment-amount">Password</InputLabel>
              <FilledInput
                type={hidePassword ? 'text' : 'password'}
                label="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {hidePassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error={formik.touched.password && formik.errors.password}>
                {formik.errors.password}
              </FormHelperText>
            </FormControl>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Login
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Login;
