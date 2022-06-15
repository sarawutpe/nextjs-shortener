import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { addLink, getLinkStatistic } from '@/redux/features/linkSlice';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styles from '@/styles/Home.module.css';
import HomeTemplate from '@/templates/Main/Index';
import { linkUtil } from '@/utils/linkUtil';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import BarChartIcon from '@mui/icons-material/BarChart';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

const Home = () => {
  const dispatch = useDispatch();
  const linkStatistic = useSelector((state) => state?.link?.linkStatistic);
  const [linkHistory, setLinkHistory] = useState([]);
  const [copied, setCopied] = useState('');

  const handelCopied = (id) => {
    setCopied(id);
    // delay
    setTimeout(() => {
      setCopied('');
    }, 300);
  };

  const formik = useFormik({
    initialValues: {
      link: '',
    },
    validate: (values) => {
      const errors = {};
      if (
        values.link &&
        !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(
          values.link
        )
      ) {
        errors.link = true;
      }

      return errors;
    },
    onSubmit: async (values, { setFieldValue }) => {
      // note: client generate short url
      if (!values.link.trim()) return;
      const data = {
        link: values.link,
        shortLink: await linkUtil.getUniqueShortLink(),
        view: '',
      };

      dispatch(addLink(data));

      // set link history
      const newLinkHistory = [];
      const finalLinkHistory = [];
      newLinkHistory = [
        { id: data.shortLink, link: data.link, shortLink: data.shortLink },
        ...linkHistory,
      ];
      // limit 6
      if (newLinkHistory.length > 6) {
        finalLinkHistory = newLinkHistory.slice(0, newLinkHistory.length - 1);
      } else {
        finalLinkHistory = newLinkHistory;
      }
      setFieldValue('link', '');
      // save to state
      setLinkHistory(finalLinkHistory);
      // save to local storage
      localStorage.setItem('linkHistory', JSON.stringify(finalLinkHistory));
    },
  });

  useEffect(() => {
    dispatch(getLinkStatistic());
    // restore link history
    const history = localStorage.getItem('linkHistory');
    if (history) {
      setLinkHistory(JSON.parse(history));
    }
  }, []);

  return (
    <>
      <Head>
        <title>Free URL Shortener</title>
      </Head>
      <HomeTemplate>
        {/* generate link */}
        <form onSubmit={formik.handleSubmit}>
          <Stack
            direction={{ xs: 'column', sm: 'column', md: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <TextField
              type="text"
              variant="filled"
              label="Link"
              margin="none"
              name="link"
              fullWidth
              value={formik.values.link}
              error={formik.touched.link && Boolean(formik.errors.link)}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Button sx={{ minWidth: 200 }} type="submit" variant="contained" color="primary">
              Shorten (ย่อลิ้งก์)
            </Button>
          </Stack>
        </form>

        {/* link history */}
        <Box display="flex" flexDirection="column" mt={3} mb={8}>
          {linkHistory.length ? (
            linkHistory.map((row, index) => (
              <Box key={index} sx={{ width: '100%' }}>
                <Grid mb={1} bgcolor="#edf2fe" borderRadius={2} container alignItems="center">
                  <Grid item xs={12} sm={12} md={5}>
                    <Box p={1}>
                      <Typography variant="body1" className={styles.textellipsis}>
                        {row.link}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={5}>
                    <Box p={1}>
                      <Link
                        href={`${process.env.NEXT_PUBLIC_DOMAIN}/${row.shortLink}`}
                        underline="hover"
                        target="_blank"
                      >
                        <Typography variant="body1" className={styles.textellipsis} mr={1}>
                          {`${process.env.NEXT_PUBLIC_DOMAIN}/${row.shortLink}`}
                        </Typography>
                      </Link>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={12} md={2}>
                    <Box p={1}>
                      <CopyToClipboard text={`${process.env.NEXT_PUBLIC_DOMAIN}/${row.shortLink}`}>
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
                  </Grid>
                </Grid>
              </Box>
            ))
          ) : (
            <></>
          )}
        </Box>

        {/* link statistic */}
        <Stack
          direction={{ xs: 'column', sm: 'column', md: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <Card sx={{ width: '100%' }}>
            <Box display="flex" alignItems="center">
              <Box py={2} px={4}>
                <BarChartIcon color="success" fontSize="large" />
              </Box>
              <Box py={2} px={4}>
                <Typography variant="subtitle1">All Traffic</Typography>
                <Typography variant="subtitle2" color="gray">
                  {linkStatistic?.data?.allTraffic?.toLocaleString('en-GB', { timeZone: 'UTC' }) ??
                    0}
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
                  {linkStatistic?.data?.allLink?.toLocaleString('en-GB', { timeZone: 'UTC' }) ?? 0}
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
