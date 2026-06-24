import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import AdminDashboard from "./pages/AdminDashboard";
import CitizensPage from "./pages/CitizensPage";
import PropertiesPage from "./pages/PropertisePage";
import DealsPage from "./pages/DealsPage";

export default function App() {
  return (
    <Layout>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* MAIN DASHBOARD */}
        <Route path="/dashboard" element={<AdminDashboard />} />

        <Route path="/citizens" element={<CitizensPage />} />
        {/* fallback */}
        <Route path="/properties" element={<PropertiesPage />} />
        <Route path="/deals" element={<DealsPage />} />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Layout>
  );
}