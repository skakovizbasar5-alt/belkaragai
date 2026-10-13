import { Route, Routes } from 'react-router';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import PlacePage from './pages/PlacePage';
import RoutePage from './pages/RoutePage';
import QrPage from './pages/QrPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="place/:id" element={<PlacePage />} />
        <Route path="route/:id" element={<RoutePage />} />
        <Route path="qr" element={<QrPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
