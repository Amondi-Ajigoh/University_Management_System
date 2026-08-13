import { Box } from '@mui/material';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import TopBar from './TopBar';

const DRAWER_WIDTH = 272;

export default function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  const handleMobileOpen = () => {
    setMobileOpen(true);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        backgroundColor: 'background.default',
      }}
    >
      <Sidebar
        mobileOpen={mobileOpen}
        onMobileClose={handleMobileClose}
        drawerWidth={DRAWER_WIDTH}
      />

      <TopBar
        drawerWidth={DRAWER_WIDTH}
        onMenuClick={handleMobileOpen}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minWidth: 0,
          minHeight: '100vh',
          pt: '72px',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 1600,
            mx: 'auto',
            p: {
              xs: 2,
              sm: 3,
              lg: 4,
            },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}