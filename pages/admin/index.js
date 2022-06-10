import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
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
import Paper from '@mui/material/Paper';

import useUser from '@/hoc/useUser';
import { addUrl, updateUrl, deleteUrl, multiDeleteUrl } from '@/redux/features/urlSlice';
import AdminTemplate from '@/templates/Paperbase/Index';
import { getLink } from '@/redux/features/urlSlice';

import MuiDialog from '@/components/MuiDialog';

const Admin = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const router = useRouter;

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
        <div style={{ marginRight: 8 }}>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </div>
        <Stack mr={1} direction="row" spacing={1}>
          <Button onClick={handleOpenAddDialog} variant="text" size="small" startIcon={<AddIcon />}>
            เพิ่มลิ้งก์
          </Button>
          <Button
            onClick={() => {
              if (deleteUrlList.length) {
                if (confirm(`คุณต้องการลบทั้งหมด ${deleteUrlList.length} รายการ`)) {
                  dispatch(multiDeleteUrl({ urlList: deleteUrlList }));
                }
              }
            }}
            variant="text"
            size="small"
            disabled={!deleteUrlList.length}
            startIcon={<DeleteIcon />}
          >
            ลบทั้งหมด {deleteUrlList.length}
          </Button>
        </Stack>
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
          <IconButton
            onClick={() => {
              if (confirm(`คุณต้องการลบลิ้งก์ไอดี ${row.id}`)) {
                dispatch(deleteUrl({ id: row.id }));
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ),
    },
  ];

  const addFormik = useFormik({
    initialValues: {
      id: '',
      url: '',
      shortUrl: '',
      view: 0,
    },
    validate: (values) => {
      const errors = {};
      if (!values.url) {
        errors.url = 'Required';
      } else if (
        !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(
          values.url
        )
      ) {
        errors.url = 'Invalid URL';
      }
      if (values.shortUrl && !/[A-Za-z0-9]$/i.test(values.shortUrl)) {
        errors.shortUrl = 'Enter A-Za-z0-9';
      }
      if (!values.view && values.view != 0) {
        errors.view = 'Required';
      } else if (!/^[1-9]+[0-9]*$|^0$/i.test(values.view)) {
        errors.view = 'Invalid view';
      }
      return errors;
    },
    onSubmit: (values, { setFieldValue }) => {
      handleCloseAddDialog();
      const data = {
        url: values.url,
        shortUrl: values.shortUrl,
        view: values.view,
      };
      dispatch(addUrl(data));
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
        errors.url = 'Required';
      } else if (
        !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(
          values.url
        )
      ) {
        errors.url = 'Invalid URL';
      }
      if (!values.shortUrl) {
        errors.shortUrl = 'Required';
      } else if (!/[A-Za-z0-9]$/i.test(values.shortUrl)) {
        errors.shortUrl = 'Enter A-Za-z0-9';
      }
      if (!values.view && values.view != 0) {
        errors.view = 'Required';
      } else if (!/^[1-9]+[0-9]*$|^0$/i.test(values.view)) {
        errors.view = 'Invalid view';
      }
      return errors;
    },
    onSubmit: (values, { setFieldValue }) => {
      handleCloseEditDialog();
      const data = {
        id: values.id,
        url: values.url,
        shortUrl: values.shortUrl,
        view: values.view,
      };
      dispatch(updateUrl(data));
    },
  });

  // TABLE

  useEffect(() => {
    dispatch(getLink());
  }, [dispatch, router]);

  const [pageSize, setPageSize] = useState(10);
  const [deleteUrlList, setDeleteUrlList] = useState([]);

  if (user?.auth) {
    return (
      <AdminTemplate>
        {/* table section */}
        <div style={{ height: 600, width: '100%', padding: '8px' }}>
          <DataGrid
            components={{ Toolbar: CustomToolbar }}
            sx={{ overflowX: 'auto', background: '#ffff' }}
            rows={urlList?.data || []}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[10, 20, 100]}
            checkboxSelection={true}
            onPageSizeChange={(pageSize) => setPageSize(pageSize)}
            onSelectionModelChange={(rows) => setDeleteUrlList(rows)}
            disableSelectionOnClick={true}
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
              helperText={addFormik.touched.url && addFormik.errors.url}
              onChange={addFormik.handleChange}
              onBlur={addFormik.handleBlur}
            />
            <TextField
              type="text"
              variant="filled"
              label="Short URL (Option)"
              margin="none"
              name="shortUrl"
              fullWidth
              value={addFormik.values.shortUrl}
              error={addFormik.touched.shortUrl && addFormik.errors.shortUrl}
              helperText={addFormik.touched.shortUrl && addFormik.errors.shortUrl}
              onChange={addFormik.handleChange}
              onBlur={addFormik.handleBlur}
            />
            <TextField
              type="text"
              variant="filled"
              label="View"
              margin="none"
              name="view"
              fullWidth
              value={addFormik.values.view}
              error={addFormik.touched.view && addFormik.errors.view}
              helperText={addFormik.touched.view && addFormik.errors.view}
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
