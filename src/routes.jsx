import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import Login from './app/authentication/login';
import Register from './app/authentication/register';
import Dashboard from './app/Dashboard';
import Help from './app/help';
import AccountSettings from './app/accountSettings.jsx';
import Products from './app/product';
import Transaction from './app/transaction';
// import Customers from './app/customers';
// import SalesReport from './app/salesReport';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
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
      {/* <Route
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
      /> */}
    </Routes>
  );
};

export default AppRoutes;