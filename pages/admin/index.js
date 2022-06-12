import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Chart } from 'react-google-charts';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BarChartIcon from '@mui/icons-material/BarChart';
import useUser from '@/hoc/useUser';
import { getLinkStatistic } from '@/redux/features/linkSlice';
import AdminTemplate from '@/templates/Paperbase/Index';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const Dashboard = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const router = useRouter;

  const linkStatistic = useSelector((state) => state?.link?.linkStatistic);

  const [chartRange, setChartRange] = useState('7D');
  const handelchartRange = (value) => {
    setChartRange(value);
  };

  // generate chart data
  const [chartData, setChartData] = useState([]);
  useMemo(async () => {
    return new Promise((resolve, reject) => {
      try {
        const data = [];
        const chart = linkStatistic?.data?.historicalChart || [];
        if (chart?.length) {
          // header
          data.push(['Date', 'Links']);
          for (let i = 0; i < chart.length; i++) {
            // parse to local th date
            const date = new Date(chart[i].date);
            const localDate = date.toLocaleDateString('th-TH', {
              year: 'numeric',
              month: 'numeric',
              day: 'numeric',
            });
            data.push([localDate, chart[i].link]);
            resolve();
          }
          setChartData(data);
        }
      } catch (error) {
        reject();
      }
    });
  }, [linkStatistic]);

  useEffect(() => {
    dispatch(getLinkStatistic({ range: chartRange }));
  }, [dispatch, router, chartRange]);

  if (user?.auth) {
    return (
      <AdminTemplate>
        <Head>
          <title>Admin | Dashobard</title>
        </Head>
        <Box sx={{ width: '100%', m: 1 }}>
          <Typography pl={2} variant="h6">
            Overview
          </Typography>

          {/* item 1 */}
          <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ m: 2 }}>
                <Box display="flex" justifyContent="space-around" alignItems="center">
                  <Box py={3} px={1}>
                    <BarChartIcon color="success" fontSize="large" />
                  </Box>
                  <Box py={3} px={1}>
                    <Typography variant="subtitle1">All Traffic</Typography>
                    <Typography variant="subtitle1" color="gray">
                      {linkStatistic?.data?.allTraffic?.toLocaleString('en-GB', {
                        timeZone: 'UTC',
                      })}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
            {/* item 2 */}
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ m: 2 }}>
                <Box display="flex" justifyContent="space-around" alignItems="center">
                  <Box py={3} px={1}>
                    <BarChartIcon color="error" fontSize="large" />
                  </Box>
                  <Box py={3} px={1}>
                    <Typography variant="subtitle1">All Link</Typography>
                    <Typography variant="subtitle1" color="gray">
                      {linkStatistic?.data?.allLink?.toLocaleString('en-GB', {
                        timeZone: 'UTC',
                      })}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
            {/* item 3 */}
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ m: 2 }}>
                <Box display="flex" justifyContent="space-around" alignItems="center">
                  <Box py={3} px={1}>
                    <BarChartIcon color="secondary" fontSize="large" />
                  </Box>
                  <Box py={3} px={1}>
                    <Typography variant="subtitle1">Top Traffic</Typography>
                    <Typography variant="subtitle1" color="gray">
                      {linkStatistic?.data?.topTraffic?.toLocaleString('en-GB', {
                        timeZone: 'UTC',
                      })}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
            {/* item 4 */}
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ m: 2 }}>
                <Box display="flex" justifyContent="space-around" alignItems="center">
                  <Box py={3} px={1}>
                    <BarChartIcon color="primary" fontSize="large" />
                  </Box>
                  <Box py={3} px={1}>
                    <Typography variant="subtitle1">Today Link</Typography>
                    <Typography variant="subtitle1" color="gray">
                      {linkStatistic?.data?.todayLink?.toLocaleString('en-GB', {
                        timeZone: 'UTC',
                      })}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          </Grid>
          <Box px={2} display="flex" justifyContent="space-between">
            <div>
              <Typography variant="h6">Statistics</Typography>
            </div>
            <div>
              <ButtonGroup variant="contained">
                <Button onClick={() => handelchartRange('1D')} variant="contained" size="small">
                  1D
                </Button>
                <Button onClick={() => handelchartRange('7D')} variant="contained" size="small">
                  7D
                </Button>
                <Button onClick={() => handelchartRange('30D')} variant="contained" size="small">
                  30D
                </Button>
                <Button onClick={() => handelchartRange('ALL')} variant="contained" size="small">
                  ALL
                </Button>
              </ButtonGroup>
            </div>
          </Box>
          {chartData.length ? (
            <Box p={2}>
              <Chart
                chartType="Bar"
                width="100%"
                height="400px"
                data={chartData}
                options={{
                  chart: {
                    title: `สถิติย้อนหลัง ${chartRange}`,
                    subtitle: `จำนวนข้อมูลทั้งหมด ${chartData.length || 0} รายการ`,
                  },
                }}
              />
            </Box>
          ) : (
            <></>
          )}
        </Box>
      </AdminTemplate>
    );
  }
  return <></>;
};

export default Dashboard;
