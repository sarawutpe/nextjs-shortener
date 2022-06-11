import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useUser from '@/hoc/useUser';
import { addUrl, getUrl, updateUrl, deleteUrl, multiDeleteUrl } from '@/redux/features/urlSlice';
import AdminTemplate from '@/templates/Paperbase/Index';
import MuiDialog from '@/components/MuiDialog';

const Profile = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const router = useRouter;
  
  useEffect(() => {

  }, [dispatch, router]);


  if (user?.auth) {
    return (
      <AdminTemplate>
        <Head>
          <title>Admin | URL</title>
        </Head>

       
      </AdminTemplate>
    );
  }
  return <></>;
};

export default Profile;
