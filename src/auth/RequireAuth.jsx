import { Navigate, Outlet, useLocation } from "react-router-dom";
import authStorage from "./authStorage";

export default function RequireAuth({ children }) {
  const location = useLocation();
  const token = authStorage.getToken();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children ? children : <Outlet />;
}
