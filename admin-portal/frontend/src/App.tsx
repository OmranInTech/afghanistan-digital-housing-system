import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import AdminDashboard from "./pages/AdminDashboard";


export default function App() {
  return (
    <Layout>
      <Routes>
        {/* Default redirect */}
        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* MAIN DASHBOARD */}
        <Route path="/dashboard" element={<AdminDashboard />} />

     
        {/* fallback */}
        <Route path="*" element={<div>404 - Page Not Found</div>} />
      </Routes>
    </Layout>
  );
}