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
import {
  addLink,
  getLink,
  updateLink,
  deleteLink,
  multiDeleteLink,
} from '@/redux/features/linkSlice';
import AdminTemplate from '@/templates/Paperbase/Index';
import MuiDialog from '@/components/MuiDialog';

const Link = () => {
  const { user } = useUser();
  const dispatch = useDispatch();
  const router = useRouter;

  const getLinkState = useSelector((state) => state.link?.getLinkState);

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
    editFormik.setFieldValue('link', row.link);
    editFormik.setFieldValue('shortLink', row.shortLink);
    editFormik.setFieldValue('view', row.view);
    setOpenEditDialog(true);
  };
  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  // DataGrid
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
              if (deleteLinkList.length) {
                if (confirm(`คุณต้องการลบทั้งหมด ${deleteLinkList.length} รายการ`)) {
                  dispatch(multiDeleteLink({ linkList: deleteLinkList }));
                }
              }
            }}
            variant="text"
            size="small"
            disabled={!deleteLinkList.length}
            startIcon={<DeleteIcon />}
          >
            ลบทั้งหมด {deleteLinkList.length}
          </Button>
        </Stack>
      </GridToolbarContainer>
    );
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'link', headerName: 'Link', width: 300 },
    { field: 'shortLink', headerName: 'Short Link', width: 120 },
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
              setDeleteLinkList([]);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => {
              if (confirm(`คุณต้องการลบลิ้งก์ไอดี ${row.id}`)) {
                dispatch(deleteLink({ id: row.id }));
                setDeleteLinkList([]);
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
      link: '',
      shortLink: '',
      view: 0,
    },
    validate: (values) => {
      const errors = {};
      if (!values.link) {
        errors.link = 'Required';
      } else if (
        !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(
          values.link
        )
      ) {
        errors.link = 'Invalid Link';
      }
      if (values.shortLink && !/[A-Za-z0-9]$/i.test(values.shortLink)) {
        errors.shortLink = 'Enter A-Za-z0-9';
      }
      if (!values.view && values.view != 0) {
        errors.view = 'Required';
      } else if (!/^[1-9]+[0-9]*$|^0$/i.test(values.view)) {
        errors.view = 'Invalid view';
      }
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      handleCloseAddDialog();
      const data = {
        link: values.link,
        shortLink: values.shortLink,
        view: values.view,
      };
      const res = await dispatch(addLink(data));
      // alert
      if (!res?.payload?.ok) {
        toast.error(res?.payload.data);
      }
      resetForm();
    },
  });

  const editFormik = useFormik({
    initialValues: {
      id: '',
      link: '',
      shortLink: '',
      view: 0,
    },
    validate: (values) => {
      const errors = {};
      if (!values.link) {
        errors.link = 'Required';
      } else if (
        !/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(
          values.link
        )
      ) {
        errors.link = 'Invalid Link';
      }
      if (!values.shortLink) {
        errors.shortLink = 'Required';
      } else if (!/[A-Za-z0-9]$/i.test(values.shortLink)) {
        errors.shortLink = 'Enter A-Za-z0-9';
      }
      if (!values.view && values.view != 0) {
        errors.view = 'Required';
      } else if (!/^[1-9]+[0-9]*$|^0$/i.test(values.view)) {
        errors.view = 'Invalid view';
      }
      return errors;
    },
    onSubmit: async (values) => {
      handleCloseEditDialog();
      const data = {
        id: values.id,
        link: values.link,
        shortLink: values.shortLink,
        view: values.view,
      };
      const res = await dispatch(updateLink(data));
      // alert
      if (!res?.payload?.ok) {
        console.log(res)
        toast.error(res?.payload.data);
      }
    },
  });

  useEffect(() => {
    dispatch(getLink());
  }, [dispatch, router]);

  const [pageSize, setPageSize] = useState(10);
  const [deleteLinkList, setDeleteLinkList] = useState([]);

  if (user?.auth) {
    return (
      <AdminTemplate>
        <Head>
          <title>Admin | Link</title>
        </Head>
        {/* table section */}
        <div style={{ height: 600, width: '100%', padding: '8px' }}>
          <DataGrid
            components={{ Toolbar: CustomToolbar }}
            sx={{ overflowX: 'auto', background: '#ffff' }}
            rows={getLinkState?.data || []}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[10, 20, 100]}
            checkboxSelection={true}
            onPageSizeChange={(pageSize) => setPageSize(pageSize)}
            onSelectionModelChange={(rows) => setDeleteLinkList(rows)}
            disableSelectionOnClick={true}
          />
        </div>
        {/* add section */}
        <MuiDialog title="เพิ่มลิ้งก์" open={openAddDialog} onClose={handleCloseAddDialog}>
          <form onSubmit={addFormik.handleSubmit}>
            <TextField
              type="text"
              variant="filled"
              label="Link"
              margin="none"
              name="link"
              fullWidth
              value={addFormik.values.link}
              error={addFormik.touched.link && addFormik.errors.link}
              helperText={addFormik.touched.link && addFormik.errors.link}
              onChange={addFormik.handleChange}
              onBlur={addFormik.handleBlur}
            />
            <TextField
              type="text"
              variant="filled"
              label="Short Link (Option)"
              margin="none"
              name="shortLink"
              fullWidth
              value={addFormik.values.shortLink}
              error={addFormik.touched.shortLink && addFormik.errors.shortLink}
              helperText={addFormik.touched.shortLink && addFormik.errors.shortLink}
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
            <Stack my={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
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
              label="Link"
              margin="none"
              name="link"
              fullWidth
              value={editFormik.values.link}
              error={editFormik.touched.link && editFormik.errors.link}
              helperText={editFormik.touched.link && editFormik.errors.link}
              onChange={editFormik.handleChange}
              onBlur={editFormik.handleBlur}
            />
            <TextField
              type="text"
              variant="filled"
              label="Short Link"
              margin="none"
              name="shortLink"
              fullWidth
              value={editFormik.values.shortLink}
              error={editFormik.touched.shortLink && editFormik.errors.shortLink}
              helperText={editFormik.touched.shortLink && editFormik.errors.shortLink}
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
            <Stack my={2}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
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

export default Link;
