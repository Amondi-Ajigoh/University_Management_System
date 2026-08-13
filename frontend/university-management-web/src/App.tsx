import { Navigate, Route, Routes } from 'react-router-dom';

import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/dashboard/DashboardPage';

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/"
          element={<Navigate to="/dashboard" replace />}
        />
      </Route>
    </Routes>
  );
}