import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PortfolioProvider } from "./context/PortfolioContext";
import PageLoader from "./components/common/PageLoader";

const Portfolio = React.lazy(() => import("./pages/Portfolio"));
const Settings = React.lazy(() => import("./pages/Settings"));

export default function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <PortfolioProvider>
      <BrowserRouter basename={basename}>
        <React.Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/setitings" element={<Settings />} />
            <Route path="/settings"  element={<Settings />} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </PortfolioProvider>
  );
}
