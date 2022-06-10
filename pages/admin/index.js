import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';

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
import { addUrl, getLinkStatistic } from '@/redux/features/urlSlice';
import AdminTemplate from '@/templates/Paperbase/Index';
import { getLink } from '@/redux/features/urlSlice';

import MuiDialog from '@/components/MuiDialog';

const Admin = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const urlList = useSelector((state) => state.url.urlList);

  // add mode dialog
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };
  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  // edit mode dialog
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const handleOpenEditDialog = (row) => {
    editFormik.setFieldValue('id', row.id);
    editFormik.setFieldValue('url', row.url);
    editFormik.setFieldValue('shortUrl', row.shortUrl);
    editFormik.setFieldValue('view', row.view);
    setOpenEditDialog(true);
  };
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  // TABLE

  function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />
        <GridToolbarExport />
        <IconButton onClick={handleOpenAddDialog} sx={{ position: 'absolute', top: 4, right: 4 }}>
          <AddIcon color="primary" />
        </IconButton>
      </GridToolbarContainer>
    );
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'url', headerName: 'URL', width: 300 },
    { field: 'shortUrl', headerName: 'Short URL', width: 120 },
    { field: 'view', headerName: 'View', width: 120 },
    { field: 'createdAt', headerName: 'Created At', width: 160 },
    { field: 'updatedAt', headerName: 'Updated At', width: 160 },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      sortable: false,
      editable: false,
      renderCell: ({ row }) => (
        <Stack direction="row" spacing={1}>
          <IconButton
            onClick={() => {
              handleOpenEditDialog(row);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      url: 'https://translate.google.co.th',
      shortUrl: 'GEkmNZ',
      view: 36,
      createdAt: '2022-06-08T18:52:47.000Z',
      updatedAt: '2022-06-08T18:52:47.000Z',
    },
    {
      id: 2,
      url: 'https://translate.google.co.th',
      shortUrl: 'GEkmNZ',
      view: 35,
      createdAt: '2022-06-08T18:52:47.000Z',
      updatedAt: '2022-06-08T18:52:47.000Z',
    },
    {
      id: 3,
      url: 'https://translate.google.co.th',
      shortUrl: 'GEkmNZ',
      view: 35,
      createdAt: '2022-06-08T18:52:47.000Z',
      updatedAt: '2022-06-08T18:52:47.000Z',
    },
    {
      id: 4,
      url: 'https://translate.google.co.th',
      shortUrl: 'GEkmNZ',
      view: 35,
      createdAt: '2022-06-08T18:52:47.000Z',
      updatedAt: '2022-06-08T18:52:47.000Z',
    },
    {
      id: 5,
      url: 'https://translate.google.co.th',
      shortUrl: 'GEkmNZ',
      view: 35,
      createdAt: '2022-06-08T18:52:47.000Z',
      updatedAt: '2022-06-08T18:52:47.000Z',
    },
    {
      id: 6,
      url: 'https://translate.google.co.th',
      shortUrl: 'GEkmNZ',
      view: 35,
      createdAt: '2022-06-08T18:52:47.000Z',
      updatedAt: '2022-06-08T18:52:47.000Z',
    },
    {
      id: 7,
      url: 'https://translate.google.co.th',
      shortUrl: 'GEkmNZ',
      view: 35,
      createdAt: '2022-06-08T18:52:47.000Z',
      updatedAt: '2022-06-08T18:52:47.000Z',
    },
    {
      id: 8,
      url: 'https://translate.google.co.th',
      shortUrl: 'GEkmNZ',
      view: 35,
      createdAt: '2022-06-08T18:52:47.000Z',
      updatedAt: '2022-06-08T18:52:47.000Z',
    },
    {
      id: 9,
      url: 'https://translate.google.co.th',
      shortUrl: 'GEkmNZ',
      view: 35,
      createdAt: '2022-06-08T18:52:47.000Z',
      updatedAt: '2022-06-08T18:52:47.000Z',
    },
    {
      id: 10,
      url: 'https://translate.google.co.th',
      shortUrl: 'GEkmNZ',
      view: 35,
      createdAt: '2022-06-08T18:52:47.000Z',
      updatedAt: '2022-06-08T18:52:47.000Z',
    },
    {
      id: 11,
      url: 'https://translate.google.co.th',
      shortUrl: 'GEkmNZ',
      view: 35,
      createdAt: '2022-06-08T18:52:47.000Z',
      updatedAt: '2022-06-08T18:52:47.000Z',
    },
    {
      id: 12,
      url: 'https://translate.google.co.th',
      shortUrl: 'GEkmNZ',
      view: 35,
      createdAt: '2022-06-08T18:52:47.000Z',
      updatedAt: '2022-06-08T18:52:47.000Z',
    },
    {
      id: 13,
      url: 'https://translate.google.co.th',
      shortUrl: 'GEkmNZ',
      view: 35,
      createdAt: '2022-06-08T18:52:47.000Z',
      updatedAt: '2022-06-08T18:52:47.000Z',
    },
    {
      id: 14,
      url: 'https://translate.google.co.th',
      shortUrl: 'GEkmNZ',
      view: 35,
      createdAt: '2022-06-08T18:52:47.000Z',
      updatedAt: '2022-06-08T18:52:47.000Z',
    },
    {
      id: 15,
      url: 'https://translate.google.co.th',
      shortUrl: 'GEkmNZ',
      view: 35,
      createdAt: '2022-06-08T18:52:47.000Z',
      updatedAt: '2022-06-08T18:52:47.000Z',
    },
  ];

  const addFormik = useFormik({
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
        setFieldValue('url', '');
      }
    },
  });

  const editFormik = useFormik({
    initialValues: {
      id: '',
      url: '',
      shortUrl: '',
      view: 0,
    },
    validate: (values) => {
      const errors = {};
      if (!values.url) {
        errors.url = "Required";
      } else if (!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(values.url)) {
        errors.url = "Invalid URL";
      }
      if (!values.shortUrl) {
        errors.shortUrl = "Required";
      } else if (!/[A-Za-z0-9]$/i.test(values.shortUrl)) {
        errors.shortUrl = "Enter A-Za-z0-9"
      }
      if (!values.view) {
        errors.view = "Required";
      } else if (!/^[1-9]+[0-9]*$/i.test(values.view)) {
        errors.view = "Invalid view";
      }
      return errors;
    },
    onSubmit: async (values, { setFieldValue }) => {

      const data = {
        id: values.id,
        url: values.url,
        shortUrl: values.shortUrl,
        view: values.view
      }

      const res = await dispatch(addUrl({ url: values.url }));
      if (res?.meta?.requestStatus === 'fulfilled') {
        setFieldValue('url', '');
      }
    },
  });

  // TABLE

  useEffect(() => {
    dispatch(getLink());
  }, []);

  const [page, setpage] = useState(5);

  if (user?.auth) {
    return (
      <AdminTemplate>
        {/* table section */}
        <div style={{ height: 600, width: '100%', background: 'white', padding: '8px' }}>
          <DataGrid
            components={{ Toolbar: CustomToolbar }}
            // sx={{ overflowX: 'auto' }}
            rows={rows}
            columns={columns}
            pageSize={page}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            onSelectionModelChange={(rows) => {
              console.log(rows);
            }}
            disableSelectionOnClick
          />
        </div>
        {/* add section */}
        <MuiDialog title="เพิ่มลิ้งก์" open={openAddDialog} onClose={handleCloseAddDialog}>
          <form onSubmit={addFormik.handleSubmit}>
            <TextField
              type="text"
              variant="filled"
              label="URL"
              margin="none"
              name="url"
              fullWidth
              value={addFormik.values.url}
              error={addFormik.touched.url && addFormik.errors.url}
              onChange={addFormik.handleChange}
              onBlur={addFormik.handleBlur}
            />

            <Stack mt={2} mb={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                // disabled={addNewsState.isFetching}
              >
                บันทึก
              </Button>
            </Stack>
          </form>
        </MuiDialog>

        {/* edit section */}
        <MuiDialog title="แก้ไขลิ้งก์" open={openEditDialog} onClose={handleCloseEditDialog}>
          <form onSubmit={editFormik.handleSubmit}>
            <TextField
              type="text"
              variant="filled"
              label="URL"
              margin="none"
              name="url"
              fullWidth
              value={editFormik.values.url}
              error={editFormik.touched.url && editFormik.errors.url}
              helperText={editFormik.touched.url && editFormik.errors.url}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
            />
            <TextField
              type="text"
              variant="filled"
              label="Short URL"
              margin="none"
              name="shortUrl"
              fullWidth
              value={editFormik.values.shortUrl}
              error={editFormik.touched.shortUrl && editFormik.errors.shortUrl}
              helperText={editFormik.touched.shortUrl && editFormik.errors.shortUrl}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
            />
            <TextField
              type="text"
              variant="filled"
              label="View"
              margin="none"
              name="view"
              fullWidth
              value={editFormik.values.view}
              error={editFormik.touched.view && editFormik.errors.view}
              helperText={editFormik.touched.view && editFormik.errors.view}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
            />
            <Stack mt={2} mb={1}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                // disabled={addNewsState.isFetching}
              >
                แก้ไข
              </Button>
            </Stack>
          </form>
        </MuiDialog>
      </AdminTemplate>
    );
  }
  return <></>;
};

export default Admin;
