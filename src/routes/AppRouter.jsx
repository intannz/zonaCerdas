import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../shared/layouts/MainLayout';
import AuthLayout from '../shared/layouts/AuthLayout';
import DashboardLayout from '../shared/layouts/DashboardLayout';

// Route Guards
import GuestRoute from './GuestRoute';
// import ProtectedRoute from './ProtectedRoute';
import ContributorRoute from './ContributorRoute';

// Pages - Auth
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';

// Pages - Fitur yang sudah aktif
import Catalog from '../features/catalog/pages/Catalog';
import ContentDetail from '../features/catalog/pages/ContentDetail';
import MyLibrary from '../features/library/pages/MyLibrary';

// === FITUR CONTRIBUTOR & PROFILE DIMATIKAN SEMENTARA ===
import UploadContent from '../features/contributor/pages/UploadContent';
import EditContent from '../features/contributor/pages/EditContent';
import MyContents from '../features/contributor/pages/MyContents';
//import Balance from '../features/contributor/pages/Balance';
import Transactions from '../features/contributor/pages/Transactions';
import Profile from '../features/contributor/pages/Profile';
//import Profile from '../features/profile/pages/Profile';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* --- 1. PUBLIC ROUTES & FITUR SEMENTARA --- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/catalog" replace />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<ContentDetail />} />
          <Route path="/library" element={<MyLibrary />} />
        </Route>

        {/* --- 2. GUEST ROUTES (Otentikasi) --- */}
        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
          </Route>
        </Route>

        {/* --- 3. PROTECTED ROUTES (Di comment dulu sampai sistem Auth dan Layout-nya selesai dibuat) --- */}
        {/* <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route> 
        */}

        {/* --- 4. CONTRIBUTOR ROUTES --- */}
        <Route element={<ContributorRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/contributor/upload" element={<UploadContent />} />
            <Route path="/contributor/edit/:id" element={<EditContent />} />
            <Route path="/contributor/my-contents" element={<MyContents />} />
            <Route path="/contributor/profile" element={<Profile />} />
            {/*<Route path="/contributor/balance" element={<Balance />} />*/}
            <Route path="/contributor/transactions" element={<Transactions />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}