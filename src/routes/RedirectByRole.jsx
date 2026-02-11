import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function RedirectByRole() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  switch (user.userType) {
    case "SuperAdmin":
      return <Navigate to="/dashboard/superadmin" replace />;

    case "Dealer":
      return <Navigate to="/dashboard/dealer" replace />;

    case "OfficeAdmin":
      return <Navigate to="/dashboard/officeadmin" replace />;

    case "BranchAdmin":
      return <Navigate to="/dashboard/branchadmin" replace />;

    case "Employee":
      return <Navigate to="/dashboard/employee" replace />;

    default:
      return <Navigate to="/login" replace />;
  }
}
