import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { addUrl, getLinkStatistic } from '@/redux/features/urlSlice';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from '@/styles/Home.module.css';
import HomeTemplate from '@/templates/Main/Index';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import BarChartIcon from '@mui/icons-material/BarChart';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

const Home = () => {
  const dispatch = useDispatch();

  const urlStatistic = useSelector((state) => state.url.urlStatistic);
  const [urlHistory, setUrlHistory] = useState([]);
  const [copied, setCopied] = useState('');

  const handelCopied = (id) => {
    setCopied(id);
    // delay
    setTimeout(() => {
      setCopied('');
    }, 500);
  };

  const formik = useFormik({
    initialValues: {
      url: '',
    },
    validate: (values) => {
      const errors = {};
      if (
        values.url &&
        !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(
          values.url
        )
      ) {
        errors.url = true;
      }

      return errors;
    },
    onSubmit: async (values, { setFieldValue }) => {
      if (!values.url.trim()) return;
      const res = await dispatch(addUrl({ url: values.url }));
      if (res?.meta?.requestStatus === 'fulfilled') {
        const id = res?.payload?.result.id ?? '';
        const url = res?.payload?.result.url ?? '';
        const shortUrl = res?.payload?.result.shortUrl ?? '';
        const newUrlHistory = [];
        const finalUrlHistory = [];
        newUrlHistory = [{ id: id, url: url, shortUrl: shortUrl }, ...urlHistory];
        // limit 6
        if (newUrlHistory.length > 6) {
          finalUrlHistory = newUrlHistory.slice(0, newUrlHistory.length - 1);
        } else {
          finalUrlHistory = newUrlHistory;
        }
        setFieldValue('url', '');
        // save to state
        setUrlHistory(finalUrlHistory);
        // save to local storage
        localStorage.setItem('urlHistory', JSON.stringify(finalUrlHistory));
      }
    },
  });

  useEffect(() => {
    dispatch(getLinkStatistic());
    
    // restore url history
    const history = localStorage.getItem('urlHistory');
    if (history) {
      setUrlHistory(JSON.parse(history));
    }
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
      </Head>
      <HomeTemplate>
        {/* generate url */}
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="row" spacing={2}>
            <TextField
              type="text"
              variant="filled"
              label="URL"
              margin="none"
              name="url"
              fullWidth
              value={formik.values.url}
              error={formik.touched.url && formik.errors.url}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Button sx={{ minWidth: 200 }} type="submit" variant="contained" color="primary">
              Shorten
            </Button>
          </Stack>
        </form>
        {/* url history */}
        <Box display="flex" flexDirection="column" mt={3} mb={8}>
          {urlHistory.length ? (
            urlHistory.map((row, index) => (
              <Box key={index}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '700px 280px 1fr',
                    gap: 2,
                    alignItems: 'center',
                    background: '#edf2fe',
                    p: 1,
                    mb: 1,
                    borderRadius: 2,
                  }}
                >
                  <Box>
                    <Typography variant="body1" className={styles.textellipsis}>
                      {row.url}
                    </Typography>
                  </Box>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_DOMAIN}/${row.shortUrl}`}
                    underline="hover"
                    target="_blank"
                  >
                    <Typography variant="body1" className={styles.textellipsis} mr={1}>
                      {`${process.env.NEXT_PUBLIC_DOMAIN}/${row.shortUrl}`}
                    </Typography>
                  </Link>
                  <Box>
                    <CopyToClipboard text={`${process.env.NEXT_PUBLIC_DOMAIN}/${row.shortUrl}`}>
                      <Button
                        onClick={() => handelCopied(row.id)}
                        type="button"
                        variant="contained"
                        color={copied === row.id ? 'success' : 'primary'}
                        fullWidth
                      >
                        {copied === row.id ? 'Copied' : 'Copy'}
                      </Button>
                    </CopyToClipboard>
                  </Box>
                </Box>
              </Box>
            ))
          ) : (
            <></>
          )}
        </Box>
        {/* url statistic */}
        <Stack direction="row" spacing={2}>
          <Card sx={{ width: '100%' }}>
            <Box display="flex" alignItems="center">
              <Box py={2} px={4}>
                <BarChartIcon color="success" fontSize="large" />
              </Box>
              <Box py={2} px={4}>
                <Typography variant="subtitle1">All Traffic</Typography>
                <Typography variant="subtitle2" color="gray">
                  {urlStatistic?.data?.all_traffic.toLocaleString('en-GB', { timeZone: 'UTC' })}
                </Typography>
              </Box>
            </Box>
          </Card>
          <Card sx={{ width: '100%' }}>
            <Box display="flex" alignItems="center">
              <Box py={2} px={4}>
                <CompareArrowsIcon color="error" fontSize="large" />
              </Box>
              <Box py={2} px={4}>
                <Typography variant="subtitle1">All Link</Typography>
                <Typography variant="subtitle2" color="gray">
                  {urlStatistic?.data?.all_link.toLocaleString('en-GB', { timeZone: 'UTC' })}
                </Typography>
              </Box>
            </Box>
          </Card>
        </Stack>
      </HomeTemplate>
    </>
  );
};

export default Home;
