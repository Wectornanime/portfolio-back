import { Route, Routes } from "react-router-dom";

import ProtectedRouteGuard from "./guards/protectedRoute.guard";
import PublicRouterGuard from "./guards/publicRoute.guard";

import { routes } from "@/config/routes";

function App() {
  const publicRouterList = Object.entries(routes.public);
  const internalRouterList = Object.entries(routes.internal);
  const externalRouterList = Object.entries(routes.external);

  return (
    <Routes>
      <Route element={<PublicRouterGuard />}>
        {externalRouterList.map(([path, PageComponent]) => (
          <Route key={path} element={<PageComponent />} path={path} />
        ))}
      </Route>

      <Route element={<ProtectedRouteGuard />}>
        {internalRouterList.map(([path, PageComponent]) => (
          <Route key={path} element={<PageComponent />} path={path} />
        ))}
      </Route>

      {publicRouterList.map(([path, PageComponent]) => (
        <Route key={path} element={<PageComponent />} path={path} />
      ))}
    </Routes>
  );
}

export default App;
