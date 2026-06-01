import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import SalesAgentRegistration from "./pages/SalesAgentRegistration";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/sales-agent-registration" element={<SalesAgentRegistration />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}