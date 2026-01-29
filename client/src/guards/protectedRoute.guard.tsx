import { Navigate, Outlet } from "react-router-dom";

import { isAuthTokenValid } from "@/utils/authTokenValidator";

export default function ProtectedRouteGuard() {
  const isValidToken = isAuthTokenValid();

  return isValidToken ? <Outlet /> : <Navigate replace to="/login" />;
}
