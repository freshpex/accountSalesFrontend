import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy } from 'react';
import Layout from './components/layout';
import ProtectedRoute from './components/protectedRoute';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const Login = lazy(() => import('./app/authentication/login'));
const Register = lazy(() => import('./app/authentication/register'));
const Dashboard = lazy(() => import('./app/dashboard'));
const Help = lazy(() => import('./app/help'));
const AccountSettings = lazy(() => import('./app/accountSettings.jsx'));
const Products = lazy(() => import('./app/product'));
const Transaction = lazy(() => import('./app/transaction'));
const Customers = lazy(() => import('./app/customer'));
const SalesReport = lazy(() => import('./app/salesReport'));
const ResetPassword = lazy(() => import('./app/authentication/ForgotPassword/ResetPassword.jsx'));
const EmailInfo = lazy(() => import('./app/authentication/ForgotPassword/EmailInfo.jsx'));
const ChangePassword = lazy(() => import('./app/authentication/ForgotPassword/changePassword.jsx'));

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ResetPassword />} />
      <Route path="/email-check" element={<EmailInfo />} />
      <Route path="/reset-password/:id" element={<ChangePassword />} />

      {/* Protected Routes Group */}
      <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/help" element={<Help />} />
        <Route path="/settings" element={<AccountSettings />} />
        <Route path="/product/*" element={<Products />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/sales-report" element={<SalesReport />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;