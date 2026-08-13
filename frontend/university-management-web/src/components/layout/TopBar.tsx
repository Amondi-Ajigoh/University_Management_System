import { AccountCircleOutlined, MenuOutlined, NotificationsNoneOutlined, LogoutOutlined, SettingsOutlined } from '@mui/icons-material';
import { AppBar, Badge, Box, Divider, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';

interface TopBarProps { drawerWidth: number; onMenuClick: () => void; }

export default function TopBar({ drawerWidth, onMenuClick }: TopBarProps) {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);
  const displayName = user ? `${user.firstName} ${user.lastName}` : 'Administrator';

  const handleSignOut = () => { setAnchorEl(null); signOut(); navigate('/login', { replace: true }); };

  return <AppBar position="fixed" elevation={0} color="inherit" sx={{ width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` }, ml: { xs: 0, md: `${drawerWidth}px` }, borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', color: 'text.primary' }}>
    <Toolbar sx={{ minHeight: 72, px: { xs: 2, sm: 3 } }}>
      <IconButton color="inherit" edge="start" onClick={onMenuClick} sx={{ display: { xs: 'inline-flex', md: 'none' }, mr: 1 }} aria-label="Open navigation menu"><MenuOutlined /></IconButton>
      <Box sx={{ flex: 1 }}><Typography variant="subtitle1" sx={{ fontWeight: 700 }}>University Management System</Typography><Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'none', sm: 'block' } }}>Administration Portal</Typography></Box>
      <Tooltip title="Notifications"><IconButton color="inherit" onClick={() => navigate('/notifications')} aria-label="Notifications"><Badge badgeContent={3} color="error" max={99}><NotificationsNoneOutlined /></Badge></IconButton></Tooltip>
      <Tooltip title="Account"><IconButton color="inherit" onClick={(event) => setAnchorEl(event.currentTarget)} aria-label="Account"><AccountCircleOutlined /></IconButton></Tooltip>
      <Menu anchorEl={anchorEl} open={menuOpen} onClose={() => setAnchorEl(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Box sx={{ px: 2, py: 1.25, minWidth: 220 }}><Typography variant="body2" sx={{ fontWeight: 700 }}>{displayName}</Typography><Typography variant="caption" color="text.secondary">{user?.email ?? 'Administrator account'}</Typography></Box>
        <Divider />
        <MenuItem onClick={() => { setAnchorEl(null); navigate('/profile'); }}><AccountCircleOutlined fontSize="small" sx={{ mr: 1.5 }} />Profile</MenuItem>
        <MenuItem onClick={() => { setAnchorEl(null); navigate('/settings'); }}><SettingsOutlined fontSize="small" sx={{ mr: 1.5 }} />Settings</MenuItem>
        <MenuItem onClick={handleSignOut}><LogoutOutlined fontSize="small" sx={{ mr: 1.5 }} />Sign out</MenuItem>
      </Menu>
    </Toolbar>
  </AppBar>;
}
