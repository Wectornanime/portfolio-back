import { Navigate, Outlet } from "react-router-dom";

import { isAuthTokenValid } from "@/utils/authTokenValidator";

export default function PublicRouterGuard() {
  const isTokenValid = isAuthTokenValid();

  return isTokenValid ? <Navigate replace to="/" /> : <Outlet />;
}
