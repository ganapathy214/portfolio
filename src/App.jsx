import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PortfolioProvider } from "./context/PortfolioContext";
import PageLoader from "./components/common/PageLoader";

const Portfolio = React.lazy(() => import("./pages/Portfolio"));
const Settings = React.lazy(() => import("./pages/Settings"));

export default function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: (
          <React.Suspense fallback={<PageLoader />}>
            <Portfolio />
          </React.Suspense>
        ),
      },
      {
        path: "/setitings",
        element: (
          <React.Suspense fallback={<PageLoader />}>
            <Settings />
          </React.Suspense>
        ),
      },
      {
        path: "/settings",
        element: (
          <React.Suspense fallback={<PageLoader />}>
            <Settings />
          </React.Suspense>
        ),
      },
    ],
    {
      basename: basename,
    }
  );

  return (
    <PortfolioProvider>
      <RouterProvider router={router} />
    </PortfolioProvider>
  );
}
