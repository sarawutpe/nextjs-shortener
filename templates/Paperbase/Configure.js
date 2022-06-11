import DashboardIcon from '@mui/icons-material/Dashboard';
import AddLinkIcon from '@mui/icons-material/AddLink';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyIcon from '@mui/icons-material/Key';
import LogoutIcon from '@mui/icons-material/Logout';

export const categories = [
  {
    id: 'Navigation',
    children: [
      {
        id: 'Dashboard',
        path: '/admin',
        icon: <DashboardIcon />,
      },
      { id: 'URL', path: '/admin/url', icon: <AddLinkIcon /> },
    ],
  },
  {
    id: 'Settings',
    children: [
      { id: 'Profile', path: '/admin/profile', icon: <SettingsIcon /> },
      { id: 'Password', path: '/admin/change_password', icon: <KeyIcon /> },
    ],
  },
  {
    id: 'More',
    children: [{ id: 'Logout', path: '/admin/logout', icon: <LogoutIcon /> }],
  },
];
