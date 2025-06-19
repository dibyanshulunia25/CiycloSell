// frontend/src/App.jsx

import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import BicyclesPage from './pages/BicyclesPage';
import BicycleDetailPage from './pages/BicycleDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';
import AdminAddBicyclePage from './pages/AdminAddBicyclePage';
import AdminEditBicyclePage from './pages/AdminEditBicyclePage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<HomePage />} />
        <Route path="bicycles" element={<BicyclesPage />} />
        <Route path="bicycle/:id" element={<BicycleDetailPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="cart" element={<CartPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="admin/bicycle/new" element={<AdminAddBicyclePage />} />
          <Route path="admin/bicycle/edit/:id" element={<AdminEditBicyclePage />} />
        </Route>

        {/* Not Found Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;