import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import Layout from './components/layout';

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
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ResetPassword />} />
      <Route path="/email-check" element={<EmailInfo />} />
      <Route path="/reset-password/:id" element={<ChangePassword />} />
      <Route
        path="/"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />
      <Route
        path="/help"
        element={
          <Layout>
            <Help />
          </Layout>
        }
      />
      <Route
        path="/settings"
        element={
          <Layout>
            <AccountSettings />
          </Layout>
        }
      />
      <Route
        path="/product/*"
        element={
          <Layout>
            <Products />
          </Layout>
        }
      />
      <Route
        path="/transaction"
        element={
          <Layout>
            <Transaction />
          </Layout>
        }
      />
      <Route
        path="/customers"
        element={
          <Layout>
            <Customers />
          </Layout>
        }
      />
      <Route
        path="/sales-report"
        element={
          <Layout>
            <SalesReport />
          </Layout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;