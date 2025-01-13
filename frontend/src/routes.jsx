import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout from './components/layout';
import ProtectedRoute from './components/protectedRoute';
import LoadingSpinner from './components/LoadingSpinner'; // Add this component for loading states

// Lazy load components with proper chunks naming
const LandingPage = lazy(() => import(/* webpackChunkName: "landing" */ './pages/landingPage'));
const Login = lazy(() => import(/* webpackChunkName: "auth" */ './app/authentication/login'));
const Register = lazy(() => import(/* webpackChunkName: "auth" */ './app/authentication/register'));
const Dashboard = lazy(() => import(/* webpackChunkName: "dashboard" */ './app/dashboard'));
const Help = lazy(() => import('./app/help'));
const AccountSettings = lazy(() => import('./app/accountSettings.jsx'));
const Products = lazy(() => import('./app/product'));
const Transaction = lazy(() => import('./app/transaction'));
const Customers = lazy(() => import('./app/customer'));
const SalesReport = lazy(() => import('./app/salesReport'));
const ResetPassword = lazy(() => import('./app/authentication/ForgotPassword/ResetPassword.jsx'));
const EmailInfo = lazy(() => import('./app/authentication/ForgotPassword/EmailInfo.jsx'));
const ChangePassword = lazy(() => import('./app/authentication/ForgotPassword/changePassword.jsx'));
const ProductDetail = lazy(() => import(/* webpackChunkName: "product-detail" */ './app/product/pages/ProductDetail'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="/email-check" element={<EmailInfo />} />
        <Route path="/reset-password/:id" element={<ChangePassword />} />

        {/* Protected Routes with Layout */}
        <Route element={
          <ProtectedRoute>
            <Layout>
              <Outlet />
            </Layout>
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/help" element={<Help />} />
          <Route path="/settings" element={<AccountSettings />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product/:type/:id" element={<ProductDetail />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/sales-report" element={<SalesReport />} />
        </Route>

        {/* 404 and catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;