import PeopleIcon from '@mui/icons-material/People';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyIcon from '@mui/icons-material/Key';
import LogoutIcon from '@mui/icons-material/Logout';

export const categories = [
  {
    id: 'Navigation',
    children: [
      {
        id: 'Dashboard',
        path: 'admin/',
        icon: <PeopleIcon />,
      },
      { id: 'Database', path: 'admin/dashboard', icon: <DnsRoundedIcon /> },
    ],
  },
  {
    id: 'Settings',
    children: [
      { id: 'Profile', path: 'admin/profile', icon: <SettingsIcon /> },
      { id: 'Password', path: 'admin/password', icon: <KeyIcon /> },
    ],
  },
  {
    id: 'More',
    children: [{ id: 'Logout', path: 'admin/logout', icon: <LogoutIcon /> }],
  },
];







