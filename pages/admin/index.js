import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import BarChartIcon from '@mui/icons-material/BarChart';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';

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
import { getUrlStatistic, getUrl, updateUrl, deleteUrl, multiDeleteUrl } from '@/redux/features/urlSlice';
import AdminTemplate from '@/templates/Paperbase/Index';
import MuiDialog from '@/components/MuiDialog';

const Dashboard = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const router = useRouter;

  const urlStatistic = useSelector((state) => state.url.urlStatistic);

  useEffect(() => {
    dispatch(getUrlStatistic());

  }, [dispatch, router, user]);

  let data = 100000000000;

  if (user?.auth) {
    return (
      <AdminTemplate>
        <Head>
          <title>Admin | URL</title>
        </Head>
        {/* <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}></Grid> */}


        <Box sx={{ width: '100%', m: 1 }}>

          <Typography pl={2} variant="h6">Statistics</Typography>

       
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

          <Grid item xs={3}>
            <Card sx={{ m: 2 }}>
              <Box display="flex" justifyContent="space-around" alignItems="center">
                <Box py={3} px={1}>
                  <BarChartIcon color="success" fontSize="large" />
                </Box>
                <Box py={3} px={1}>
                  <Typography variant="subtitle1">All Traffic</Typography>
                  <Typography variant="subtitle1" color="gray">
                    {urlStatistic?.data?.allTraffic?.toLocaleString('en-GB', { timeZone: 'UTC' })}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card sx={{ m: 2 }}>
              <Box display="flex" justifyContent="space-around" alignItems="center">
                <Box py={3} px={1}>
                  <CompareArrowsIcon color="error" fontSize="large" />
                </Box>
                <Box py={3} px={1}>
                  <Typography variant="subtitle1">All Link</Typography>
                  <Typography variant="subtitle1" color="gray">
                    {urlStatistic?.data?.allLink?.toLocaleString('en-GB', { timeZone: 'UTC' })}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card sx={{ m: 2 }}>
              <Box display="flex" justifyContent="space-around" alignItems="center">
                <Box py={3} px={1}>
                  <BubbleChartIcon color="secondary" fontSize="large" />
                </Box>
                <Box py={3} px={1}>
                  <Typography variant="subtitle1">Top Traffic</Typography>
                  <Typography variant="subtitle1" color="gray">
                    {urlStatistic?.data?.topTraffic?.toLocaleString('en-GB', { timeZone: 'UTC' })}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={3}>
            <Card sx={{ m: 2 }}>
              <Box display="flex" justifyContent="space-around" alignItems="center">
                <Box py={3} px={1}>
                  <CloseFullscreenIcon color="primary" fontSize="large" />
                </Box>
                <Box py={3} px={1}>
                  <Typography variant="subtitle1">Today Link</Typography>
                  <Typography variant="subtitle1" color="gray">
                    {urlStatistic?.data?.todayLink?.toLocaleString('en-GB', { timeZone: 'UTC' })}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>

        </Grid>


        </Box>

      </AdminTemplate>
    );
  }
  return <></>;
};

export default Dashboard;
