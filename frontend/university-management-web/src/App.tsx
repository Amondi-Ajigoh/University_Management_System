import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/dashboard/DashboardPage';
import ModulePage from './pages/shared/ModulePage';
import SettingsPage from './pages/settings/SettingsPage';
import NotificationsPage from './pages/notifications/NotificationsPage';
import ProfilePage from './pages/profile/ProfilePage';
import LoginPage from './pages/auth/LoginPage';
import { useAuth } from './context/useAuth';

function ProtectedLayout() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <AppLayout />;
}

export default function App() {
  return <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<ProtectedLayout />}>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/students" element={<ModulePage title="Students" description="Manage student profiles, enrollment information, academic status and university records." />} />
      <Route path="/lecturers" element={<ModulePage title="Lecturers" description="Manage lecturer profiles, departments, teaching assignments and academic responsibilities." />} />
      <Route path="/departments" element={<ModulePage title="Departments" description="Manage academic departments, programmes, staffing and departmental information." />} />
      <Route path="/courses" element={<ModulePage title="Courses" description="Manage courses, course units, departments, credit hours and academic registrations." />} />
      <Route path="/timetable" element={<ModulePage title="Timetable" description="Manage lectures, classrooms, schedules and academic timetable allocations." />} />
      <Route path="/academic-records" element={<ModulePage title="Academic Records" description="Manage student results, grades, transcripts and academic performance records." />} />
      <Route path="/finance" element={<ModulePage title="Finance" description="Manage student fees, payments, balances and university financial records." />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Route>
  </Routes>;
}
