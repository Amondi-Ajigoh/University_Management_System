import { AccessTimeOutlined, CheckCircleOutlined, InfoOutlined, WarningAmberOutlined } from '@mui/icons-material';
import { Box, Card, CardContent, Chip, Divider, Typography } from '@mui/material';

const notifications = [
  { title:'Course registration opened', text:'Semester 2 registration is now active.', time:'10 minutes ago', type:'success' as const },
  { title:'Grades submitted', text:'Computer Science department submitted results.', time:'32 minutes ago', type:'info' as const },
  { title:'Fee payment received', text:'A student fee payment was successfully recorded.', time:'1 hour ago', type:'success' as const },
  { title:'Timetable updated', text:'A room allocation was changed for an upcoming lecture.', time:'2 hours ago', type:'warning' as const },
];
export default function NotificationsPage(){return <Box><Typography variant="h4" sx={{fontWeight:700}}>Notifications</Typography><Typography color="text.secondary" sx={{mt:.75,mb:3}}>Important university system alerts and recent activity.</Typography><Card><CardContent sx={{p:0}}>{notifications.map((n,i)=><Box key={n.title}><Box sx={{p:2.5,display:'flex',gap:2,alignItems:'flex-start'}}>{n.type==='success'?<CheckCircleOutlined color="success"/>:n.type==='warning'?<WarningAmberOutlined color="warning"/>:<InfoOutlined color="info"/>}<Box sx={{flex:1}}><Typography sx={{fontWeight:700}}>{n.title}</Typography><Typography variant="body2" color="text.secondary" sx={{mt:.5}}>{n.text}</Typography><Box sx={{display:'flex',gap:1,alignItems:'center',mt:1}}><AccessTimeOutlined sx={{fontSize:16}}/><Typography variant="caption" color="text.secondary">{n.time}</Typography><Chip size="small" label={n.type} variant="outlined"/></Box></Box></Box>{i<notifications.length-1&&<Divider/>}</Box>)}</CardContent></Card></Box>}
