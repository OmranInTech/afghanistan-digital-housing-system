import React from "react";
import SalesAgentForm from "../features/salesagentregistration/SubmissionForm";

export default function SalesAgentRegistration(): React.JSX.Element {
  return (
    <div
      style={{
        marginLeft: "280px", // Pushes content to the right of the 280px fixed premium sidebar
        minHeight: "100vh",
        backgroundColor: "#f7fafc", // Premium ultra-light background canvas
        padding: "40px 60px",
        fontFamily: "'Inter', -apple-system, sans-serif",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: "900px" }}>
        {/* Page Identity Header */}
        <div style={{ marginBottom: "32px" }}>
          <h1
            style={{
              margin: "0 0 6px 0",
              fontSize: "24px",
              fontWeight: 700,
              color: "#1a202c",
              letterSpacing: "-0.5px"
            }}
          >
            Register Security Field Agent
          </h1>
          <p style={{ margin: 0, fontSize: "14px", color: "#718096", fontWeight: 400 }}>
            Provision a new atomic database credential for verified state registry personnel.
          </p>
        </div>

        {/* Premium Form Grid */}
        <SalesAgentForm />
      </div>
    </div>
  );
}