import {
  AssessmentOutlined,
  BookOutlined,
  CalendarMonthOutlined,
  DashboardOutlined,
  GroupsOutlined,
  LogoutOutlined,
  PaymentsOutlined,
  SchoolOutlined,
  SettingsOutlined,
} from '@mui/icons-material';

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';

import type { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
  mobileOpen: boolean;
  onMobileClose: () => void;
  drawerWidth: number;
}

interface NavigationItem {
  label: string;
  path: string;
  icon: ReactNode;
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <DashboardOutlined />,
  },
  {
    label: 'Students',
    path: '/students',
    icon: <GroupsOutlined />,
  },
  {
    label: 'Lecturers',
    path: '/lecturers',
    icon: <SchoolOutlined />,
  },
  {
    label: 'Departments',
    path: '/departments',
    icon: <GroupsOutlined />,
  },
  {
    label: 'Courses',
    path: '/courses',
    icon: <BookOutlined />,
  },
  {
    label: 'Timetable',
    path: '/timetable',
    icon: <CalendarMonthOutlined />,
  },
  {
    label: 'Academic Records',
    path: '/academic-records',
    icon: <AssessmentOutlined />,
  },
  {
    label: 'Finance',
    path: '/finance',
    icon: <PaymentsOutlined />,
  },
];

const secondaryNavigationItems: NavigationItem[] = [
  {
    label: 'Settings',
    path: '/settings',
    icon: <SettingsOutlined />,
  },
];

function SidebarContent({
  onMobileClose,
}: {
  onMobileClose: () => void;
}) {
  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.paper',
      }}
    >
      {/* Brand */}
      <Box
        sx={{
          px: 2.5,
          py: 2.25,
          minHeight: 72,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              fontWeight: 800,
              fontSize: '1rem',
              flexShrink: 0,
            }}
          >
            UMS
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography
              variant="subtitle1"
              color="primary.dark"
              sx={{
                fontWeight: 700,
                lineHeight: 1.2,
              }}
              noWrap
            >
              University
            </Typography>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                lineHeight: 1.2,
              }}
              noWrap
            >
              Management System
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider />

      {/* Main navigation */}
      <Box
        sx={{
          px: 1.25,
          py: 2,
          flex: 1,
          overflowY: 'auto',
        }}
      >
        <Typography
          variant="overline"
          color="text.secondary"
          sx={{
            px: 1.5,
            fontWeight: 700,
            letterSpacing: '0.08em',
          }}
        >
          Main menu
        </Typography>

        <List disablePadding sx={{ mt: 1 }}>
          {navigationItems.map((item) => (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              onClick={onMobileClose}
              sx={{
                minHeight: 46,
                mb: 0.5,
                px: 1.5,
                borderRadius: 2,
                color: 'text.secondary',

                '& .MuiListItemIcon-root': {
                  color: 'inherit',
                  minWidth: 38,
                },

                '&.active': {
                  color: 'primary.main',
                  backgroundColor: 'action.selected',
                },

                '&.active .MuiListItemIcon-root': {
                  color: 'primary.main',
                },

                '&:hover': {
                  backgroundColor: 'action.hover',
                  color: 'text.primary',
                },
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: '0.9rem',
                      fontWeight: 600,
                    },
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>

        <Typography
          variant="overline"
          color="text.secondary"
          sx={{
            px: 1.5,
            mt: 3,
            display: 'block',
            fontWeight: 700,
            letterSpacing: '0.08em',
          }}
        >
          System
        </Typography>

        <List disablePadding sx={{ mt: 1 }}>
          {secondaryNavigationItems.map((item) => (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              onClick={onMobileClose}
              sx={{
                minHeight: 46,
                mb: 0.5,
                px: 1.5,
                borderRadius: 2,
                color: 'text.secondary',

                '& .MuiListItemIcon-root': {
                  color: 'inherit',
                  minWidth: 38,
                },

                '&.active': {
                  color: 'primary.main',
                  backgroundColor: 'action.selected',
                },

                '&:hover': {
                  backgroundColor: 'action.hover',
                  color: 'text.primary',
                },
              }}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.label}
                slotProps={{
                  primary: {
                    sx: {
                      fontSize: '0.9rem',
                      fontWeight: 600,
                    },
                  },
                }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      {/* Sign out */}
      <Box>
        <Divider />

        <Box sx={{ p: 1.5 }}>
          <ListItemButton
            component="button"
            sx={{
              width: '100%',
              minHeight: 46,
              px: 1.5,
              borderRadius: 2,
              color: 'text.secondary',

              '&:hover': {
                backgroundColor: 'action.hover',
                color: 'error.main',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 38,
                color: 'inherit',
              }}
            >
              <LogoutOutlined />
            </ListItemIcon>

            <ListItemText
              primary="Sign out"
              slotProps={{
                primary: {
                  sx: {
                    fontSize: '0.9rem',
                    fontWeight: 600,
                  },
                },
              }}
            />
          </ListItemButton>
        </Box>
      </Box>
    </Box>
  );
}

export default function Sidebar({
  mobileOpen,
  onMobileClose,
  drawerWidth,
}: SidebarProps) {
  return (
    <>
      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: {
            xs: 'none',
            md: 'block',
          },

          width: drawerWidth,
          flexShrink: 0,

          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
        open
      >
        <SidebarContent
          onMobileClose={onMobileClose}
        />
      </Drawer>

      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: 'block',
            md: 'none',
          },

          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <SidebarContent
          onMobileClose={onMobileClose}
        />
      </Drawer>
    </>
  );
}