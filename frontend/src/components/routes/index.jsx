import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AdminRoute from './adminRoute/index.jsx';
import Layout from '../layout';
import ProtectedRoute from '../routes/protectedRoute/index.jsx';
import SuspenseLoadingUI from '../../UI';
import GoogleCallback from '../../app/authentication/GoogleCallback.jsx';

// Lazy load components with proper chunks naming
const LandingPage = lazy(() => import(/* webpackChunkName: "landing" */ '../../pages/landingPage'));
const Login = lazy(() => import(/* webpackChunkName: "auth" */ '../../app/authentication/login'));
const Register = lazy(() => import(/* webpackChunkName: "auth" */ '../../app/authentication/register'));
const Dashboard = lazy(() => import(/* webpackChunkName: "dashboard" */ '../../app/dashboard'));
const Help = lazy(() => import('../../app/help'));
const AccountSettings = lazy(() => import('../../app/accountSettings.jsx'));
const Products = lazy(() => import('../../app/product'));
const Transaction = lazy(() => import('../../app/transaction'));
const Customers = lazy(() => import('../../app/customer'));
const SalesReport = lazy(() => import('../../app/salesReport'));
const ResetPassword = lazy(() => import('../../app/authentication/ForgotPassword/ResetPassword.jsx'));
const EmailInfo = lazy(() => import('../../app/authentication/ForgotPassword/EmailInfo.jsx'));
const ChangePassword = lazy(() => import('../../app/authentication/ForgotPassword/changePassword.jsx'));
const ProductDetail = lazy(() => import(/* webpackChunkName: "product-detail" */ '../../app/product/pages/ProductDetail'));
const PaymentCallback = lazy(() => import('../../app/payment/PaymentCallback'));
const EscrowDetails = lazy(() => import(/* webpackChunkName: "escrow" */ '../../app/product/pages/EscrowDetails.jsx'));
const UserDashboard  = lazy(() => import('../../app/userDashboard/UserDashboard.jsx'));
const Privacy = lazy(() => import('../../pages/legal/Privacy'));
const Terms = lazy(() => import('../../pages/legal/Terms'));
const PurchasedAccountDetails = lazy(() => import(
  /* webpackChunkName: "purchased-account" */ 
  '../../app/product/pages/PurchasedAccountDetails'
));

const AppRoutes = () => {
  return (
    <Suspense fallback={<SuspenseLoadingUI />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ResetPassword />} />
        <Route path="/email-check" element={<EmailInfo />} />
        <Route path="/reset-password/:id" element={<ChangePassword />} />
        <Route path="/payment/callback" element={<PaymentCallback />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/auth/google/callback" element={<GoogleCallback />} />

        {/* Protected Routes with Layout */}
        <Route element={
          <ProtectedRoute>
            <Layout>
              <Outlet />
            </Layout>
          </ProtectedRoute>
        }>
          <Route path="/dashboard" element={
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          } />
          <Route path="/help" element={<Help />} />
          <Route path="/settings" element={<AccountSettings />} />
          <Route path="/product/*" element={<Products />} />
          <Route path="/product/:type" element={<Products />} />
          <Route path="/product/:type/:id" element={<ProductDetail />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/customers" element={
            <AdminRoute>
              <Customers />
            </AdminRoute>
          } />
          <Route path="/sales-report" element={
            <AdminRoute>
              <SalesReport />
            </AdminRoute>
          } />
          <Route path="/escrow/:escrowId" element={<EscrowDetails />} />          
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/purchased-account/:purchaseId" element={<PurchasedAccountDetails />} />
        </Route>

        {/* 404 and catch-all route */}
        <Route path="*" element={<Navigate to="/product/all" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;