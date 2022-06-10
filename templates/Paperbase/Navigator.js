import * as React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PublicIcon from '@mui/icons-material/Public';
import { categories } from './Configure';
import { item, itemCategory } from './Style';

const Navigator = (props) => {
  const { ...other } = props;
  const router = useRouter();
  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem sx={{ ...item, ...itemCategory, fontSize: 22, color: '#fff' }}>
          Shortener
        </ListItem>
        <ListItem
          onClick={() => router.push('/')}
          sx={{ cursor: 'pointer', ...item, ...itemCategory }}
        >
          <ListItemIcon>
            <PublicIcon />
          </ListItemIcon>
          <ListItemText>Go Website</ListItemText>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: '#101F33' }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: '#fff' }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id, path, icon }) => (
              <Link key={id} href={path}>
                <ListItem disablePadding>
                  <ListItemButton selected={router.pathname === path ? true : false} sx={item}>
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{id}</ListItemText>
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
};

export default Navigator;
