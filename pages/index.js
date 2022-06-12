import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { addLink, getLinkStatistic } from '@/redux/features/linkSlice';
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
  const linkStatistic = useSelector((state) => state.link.linkStatistic);
  const [linkHistory, setLinkHistory] = useState([]);
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
      if (!values.link.trim()) return;
      const res = await dispatch(addLink({ link: values.link }));
      if (res?.meta?.requestStatus === 'fulfilled') {
        const id = res?.payload?.data.id ?? '';
        const link = res?.payload?.data.link ?? '';
        const shortLink = res?.payload?.data.shortLink ?? '';
        const newLinkHistory = [];
        const finalLinkHistory = [];
        newLinkHistory = [{ id: id, link: link, shortLink: shortLink }, ...linkHistory];
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
      }
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
        <title>Create Next App</title>
      </Head>
      <HomeTemplate>
        {/* generate link */}
        <form onSubmit={formik.handleSubmit}>
          <Stack direction="row" spacing={2}>
            <TextField
              type="text"
              variant="filled"
              label="Link"
              margin="none"
              name="link"
              fullWidth
              value={formik.values.link}
              error={formik.touched.link && formik.errors.link}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <Button sx={{ minWidth: 200 }} type="submit" variant="contained" color="primary">
              Shorten
            </Button>
          </Stack>
        </form>
        {/* link history */}
        <Box display="flex" flexDirection="column" mt={3} mb={8}>
          {linkHistory.length ? (
            linkHistory.map((row, index) => (
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
                      {row.link}
                    </Typography>
                  </Box>
                  <Link
                    href={`${process.env.NEXT_PUBLIC_DOMAIN}/${row.shortLink}`}
                    underline="hover"
                    target="_blank"
                  >
                    <Typography variant="body1" className={styles.textellipsis} mr={1}>
                      {`${process.env.NEXT_PUBLIC_DOMAIN}/${row.shortLink}`}
                    </Typography>
                  </Link>
                  <Box>
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
                </Box>
              </Box>
            ))
          ) : (
            <></>
          )}
        </Box>
        {/* link statistic */}
        <Stack direction="row" spacing={2}>
          <Card sx={{ width: '100%' }}>
            <Box display="flex" alignItems="center">
              <Box py={2} px={4}>
                <BarChartIcon color="success" fontSize="large" />
              </Box>
              <Box py={2} px={4}>
                <Typography variant="subtitle1">All Traffic</Typography>
                <Typography variant="subtitle2" color="gray">
                  {linkStatistic?.data?.allTraffic.toLocaleString('en-GB', { timeZone: 'UTC' })}
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
                  {linkStatistic?.data?.allLink.toLocaleString('en-GB', { timeZone: 'UTC' })}
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
