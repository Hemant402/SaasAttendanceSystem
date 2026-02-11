import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/auth/Login";
import ForgotPassword from "./pages/auth/ChangePassword"
import RedirectByRole from "./routes/RedirectByRole";
import DashboardLayout from "./layouts/DashboardLayout";
import SuperAdminDashboard from "./pages/dashboards/SuperAdminDashboard";
import DealerDashboard from "./pages/dashboards/DealerDashboard";
import OfficeAdminDashboard from "./pages/dashboards/OfficeAdminDashboard";
import BranchAdminDashboard from "./pages/dashboards/BranchAdminDashboard";
import EmployeeDashboard from "./pages/dashboards/EmployeeDashboard";

// Superadmin pages
import DealerList from "./pages/superadmin/DealerList";
import CreateDealer from "./pages/superadmin/CreateDealer";
import EditDealer from "./pages/superadmin/EditDealer";
import SystemSettings from "./pages/superadmin/SystemSettings";
import OfficeList from "./pages/superadmin/OfficeList";
import OfficeEdit from "./pages/superadmin/OfficeEdit"

// Dealer pages
import DealerOfficeList from "./pages/dealer/DealerOfficeList";
import CreateOffice from "./pages/dealer/CreateOffice";
import OfficeDetails from "./pages/dealer/OfficeDetails";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />}/>
        <Route path="/" element={<RedirectByRole />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="superadmin">
            <Route index element={<SuperAdminDashboard />} />
            <Route path="dealers" element={<DealerList />} />
            <Route path="dealers/create" element={<CreateDealer />} />
            <Route path="dealers/edit/:id" element={<EditDealer />} />
            <Route path="settings" element={<SystemSettings />} />
            <Route path="offices" element={<OfficeList />} />
            <Route path="offices/edit/:id" element={<OfficeEdit />} />
          </Route>

          <Route path="dealer">
            <Route index element={<DealerDashboard />} />
            <Route path="offices" element={<DealerOfficeList />} />
            <Route path="offices/create" element={<CreateOffice />} />
            <Route path="offices/:id" element={<OfficeDetails />} />
          </Route>

          <Route path="officeadmin" element={<OfficeAdminDashboard />} />
          <Route path="branchadmin" element={<BranchAdminDashboard />} />
          <Route path="employee" element={<EmployeeDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
