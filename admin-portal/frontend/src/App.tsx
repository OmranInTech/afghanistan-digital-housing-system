import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";

import AdminDashboard from "./pages/AdminDashboard";
import CitizensQueue from "./pages/CitizensQueue";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />

        <Route path="/dashboard" element={<AdminDashboard />} />

        <Route path="/citizens" element={<CitizensQueue />} />
        <Route path="/properties" element={<h2>Property Queue</h2>} />
        <Route path="/deals" element={<h2>Deals Workflow</h2>} />
        <Route path="/contracts" element={<h2>Contracts</h2>} />
        <Route path="/documents" element={<h2>Documents</h2>} />
        <Route path="/verification" element={<h2>Verification</h2>} />
      </Routes>
    </Layout>
  );
}