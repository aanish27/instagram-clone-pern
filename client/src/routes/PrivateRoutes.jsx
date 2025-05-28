import { Navigate, Outlet } from "react-router";
import { useAuth } from "../provider/authProvider";

function PrivateRoutes() {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

export default PrivateRoutes;
