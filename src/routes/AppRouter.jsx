import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from '../shared/layouts/MainLayout';
import AuthLayout from '../shared/layouts/AuthLayout';
import DashboardLayout from '../shared/layouts/DashboardLayout';

import GuestRoute from './GuestRoute';
import ProtectedRoute from './ProtectedRoute';
import ContributorRoute from './ContributorRoute';

import LandingPage from '../features/landing/pages/LandingPage';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import Catalog from '../features/catalog/pages/Catalog';
import ContentDetail from '../features/catalog/pages/ContentDetail';
import MyLibrary from '../features/library/pages/MyLibrary';

import UploadContent from '../features/contributor/pages/UploadContent';
import EditContent from '../features/contributor/pages/EditContent';
import MyContents from '../features/contributor/pages/MyContents';
import Transactions from '../features/contributor/pages/Transactions';
import Profile from '../features/contributor/pages/Profile';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* --- 1. PUBLIC ROUTES --- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<ContentDetail />} />
          
          {/* Library diproteksi agar hanya yang sudah login yang bisa masuk */}
          <Route element={<ProtectedRoute />}>
            <Route path="/library" element={<MyLibrary />} />
          </Route>
        </Route>

        {/* --- 2. GUEST ROUTES --- */}
        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
          </Route>
        </Route>

        {/* --- 3. CONTRIBUTOR ROUTES --- */}
        <Route element={<ContributorRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/contributor/upload" element={<UploadContent />} />
            <Route path="/contributor/edit/:id" element={<EditContent />} />
            <Route path="/contributor/my-contents" element={<MyContents />} />
            <Route path="/contributor/profile" element={<Profile />} />
            <Route path="/contributor/transactions" element={<Transactions />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}