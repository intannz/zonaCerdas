import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../shared/layouts/MainLayout';
import AuthLayout from '../shared/layouts/AuthLayout';
// import DashboardLayout from '../shared/layouts/DashboardLayout';

// Route Guards
import GuestRoute from './GuestRoute';
// import ProtectedRoute from './ProtectedRoute';
// import ContributorRoute from './ContributorRoute';

// Pages - Auth (YANG INI SUDAH KITA BUAT)
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';

// === SEMUA IMPORT DI BAWAH INI DIMATIKAN SEMENTARA ===
import Catalog from '../features/catalog/pages/Catalog';
// import ContentDetail from '../features/catalog/pages/ContentDetail';
// import MyLibrary from '../features/library/pages/MyLibrary';
// import UploadContent from '../features/contributor/pages/UploadContent';
// import EditContent from '../features/contributor/pages/EditContent';
// import MyContents from '../features/contributor/pages/MyContents';
// import Balance from '../features/contributor/pages/Balance';
// import Transactions from '../features/contributor/pages/Transactions';
// import Profile from '../features/profile/pages/Profile';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* --- 1. PUBLIC ROUTES --- */}
        <Route element={<MainLayout />}>
          {/* Nanti buka comment ini kalau file Catalog sudah dibuat */}
          <Route path="/" element={<Navigate to="/catalog" replace />} />
          <Route path="/catalog" element={<Catalog />} />
          {/* <Route path="/catalog/:id" element={<ContentDetail />} /> */}
        </Route>

        {/* --- 2. GUEST ROUTES (Bisa dites sekarang!) --- */}
        <Route element={<GuestRoute />}>
          <Route element={<AuthLayout />}>
            {/* Karena kita belum buat halaman utama, kita arahkan / langsung ke login untuk sementara */}
            <Route path="/" element={<Navigate to="/auth/login" replace />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
          </Route>
        </Route>

        {/* --- 3. PROTECTED ROUTES --- */}
        {/* <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/library" element={<MyLibrary />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route> */}

        {/* --- 4. CONTRIBUTOR ROUTES --- */}
        {/* <Route element={<ContributorRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/contributor/upload" element={<UploadContent />} />
            <Route path="/contributor/edit/:id" element={<EditContent />} />
            <Route path="/contributor/my-contents" element={<MyContents />} />
            <Route path="/contributor/balance" element={<Balance />} />
            <Route path="/contributor/transactions" element={<Transactions />} />
          </Route>
        </Route> */}

      </Routes>
    </BrowserRouter>
  );
}