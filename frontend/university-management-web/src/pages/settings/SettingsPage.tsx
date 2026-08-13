import { CheckCircleOutlined, LockOutlined, NotificationsOutlined, PaletteOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, FormControlLabel, Switch, Typography } from '@mui/material';
import { useState } from 'react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [compact, setCompact] = useState(false);
  return <Box>
    <Typography variant="h4" sx={{ fontWeight: 700 }}>Settings</Typography>
    <Typography color="text.secondary" sx={{ mt: .75, mb: 3 }}>Manage application preferences and account behaviour.</Typography>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2 }}>
      <Card><CardContent sx={{ p: 3 }}><Box sx={{ display:'flex', gap:1.5, alignItems:'center', mb:2 }}><NotificationsOutlined color="primary"/><Box><Typography variant="h6">Notifications</Typography><Typography variant="body2" color="text.secondary">Control system alerts.</Typography></Box></Box><FormControlLabel control={<Switch checked={notifications} onChange={e=>setNotifications(e.target.checked)} />} label="In-app notifications"/><FormControlLabel control={<Switch checked={emailAlerts} onChange={e=>setEmailAlerts(e.target.checked)} />} label="Email alerts"/></CardContent></Card>
      <Card><CardContent sx={{ p: 3 }}><Box sx={{ display:'flex', gap:1.5, alignItems:'center', mb:2 }}><PaletteOutlined color="primary"/><Box><Typography variant="h6">Interface</Typography><Typography variant="body2" color="text.secondary">Choose how the portal behaves.</Typography></Box></Box><FormControlLabel control={<Switch checked={compact} onChange={e=>setCompact(e.target.checked)} />} label="Compact data tables"/><Box sx={{ mt:2, display:'flex', alignItems:'center', gap:1 }}><CheckCircleOutlined color="success" fontSize="small"/><Typography variant="body2">Preferences are saved locally.</Typography></Box></CardContent></Card>
      <Card><CardContent sx={{ p: 3 }}><Box sx={{ display:'flex', gap:1.5, alignItems:'center', mb:1 }}><LockOutlined color="primary"/><Typography variant="h6">Security</Typography></Box><Typography variant="body2" color="text.secondary">Authentication, roles and API security will be managed by the backend authentication service.</Typography></CardContent></Card>
    </Box>
  </Box>;
}
