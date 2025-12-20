import { Route, Routes } from "react-router-dom";

import { routes } from "@/config/routes";

function App() {
  const routerList = Object.entries(routes);

  return (
    <Routes>
      {routerList.map(([path, PageComponent]) => (
        <Route key={path} element={<PageComponent />} path={path} />
      ))}
    </Routes>
  );
}

export default App;
