import {
  AccountCircleOutlined,
  MenuOutlined,
  NotificationsNoneOutlined,
} from '@mui/icons-material';

import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

interface TopBarProps {
  drawerWidth: number;
  onMenuClick: () => void;
}

export default function TopBar({
  drawerWidth,
  onMenuClick,
}: TopBarProps) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      color="inherit"
      sx={{
        width: {
          xs: '100%',
          md: `calc(100% - ${drawerWidth}px)`,
        },

        ml: {
          xs: 0,
          md: `${drawerWidth}px`,
        },

        borderBottom: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        color: 'text.primary',
      }}
    >
      <Toolbar
        sx={{
          minHeight: 72,
          px: {
            xs: 2,
            sm: 3,
          },
        }}
      >
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{
            display: {
              xs: 'inline-flex',
              md: 'none',
            },
            mr: 1,
          }}
          aria-label="Open navigation menu"
        >
          <MenuOutlined />
        </IconButton>

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle1"
            color="text.primary"
            sx={{
              fontWeight: 700,
            }}
          >
            University Management System
          </Typography>

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: {
                xs: 'none',
                sm: 'block',
              },
            }}
          >
            Administration Portal
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Tooltip title="Notifications">
            <IconButton
              color="inherit"
              aria-label="Notifications"
            >
              <Badge
                badgeContent={3}
                color="error"
                max={99}
              >
                <NotificationsNoneOutlined />
              </Badge>
            </IconButton>
          </Tooltip>

          <Tooltip title="Account">
            <IconButton
              color="inherit"
              aria-label="Account"
            >
              <AccountCircleOutlined />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}