import React, { useState } from "react";

interface AgentFormData {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  govCode: string;
  role: "AGENT" | "ADMIN";
  idNumber: string;
  licenseNumber: string;
  locationMetrics: string;
}

export default function SalesAgentForm(): React.JSX.Element {
  const [formData, setFormData] = useState<AgentFormData>({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    govCode: "",
    role: "AGENT", 
    idNumber: "",
    licenseNumber: "",
    locationMetrics: "",
  });

  const [uiMessage, setUiMessage] = useState<{ status: "success" | "error" | null; text: string }>({
    status: null,
    text: "",
  });

  // RESOLUTION 1: Used explicit namespaced type mapping to wipe out top line import dependency errors
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name as keyof AgentFormData]: value,
    }));
  };

  // RESOLUTION 2: Swapped out type modifier dependency block directly for React.FormEvent namespace wrapper
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setUiMessage({ status: null, text: "" });

    try {
      const response = await fetch("http://localhost:8000/api/v1/auth/register-agent/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUiMessage({ status: "success", text: data.message });
        setFormData({
          username: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          govCode: "",
          role: "AGENT",
          idNumber: "",
          licenseNumber: "",
          locationMetrics: "",
        });
      } else {
        const errorMsg = data.errors 
          ? Object.entries(data.errors)
              .map(([field, msgs]) => `${field}: ${(msgs as string[]).join(" ")}`)
              .join(" | ") 
          : "Failed to register agent account details.";
        setUiMessage({ status: "error", text: errorMsg });
      }
    } catch (error) {
      setUiMessage({ status: "error", text: "Could not connect to the backend database server." });
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #cbd5e0",
    backgroundColor: "#ffffff",
    color: "#2d3748",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: "6px",
    fontSize: "12px",
    fontWeight: 600,
    color: "#4a5568",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#ffffff",
        padding: "36px",
        borderRadius: "12px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
        border: "1px solid #edf2f7",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {uiMessage.status && (
        <div style={{
          padding: "12px 16px",
          borderRadius: "6px",
          marginBottom: "24px",
          fontWeight: 500,
          fontSize: "14px",
          backgroundColor: uiMessage.status === "success" ? "#f0fff4" : "#fff5f5",
          color: uiMessage.status === "success" ? "#276749" : "#9b2c2c",
          border: uiMessage.status === "success" ? "1px solid #c6f6d5" : "1px solid #fed7d7"
        }}>
          {uiMessage.text}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px", marginBottom: "32px" }}>
        
        {/* Username */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>System Username</label>
          <input
            type="text"
            name="username"
            placeholder="e.g., ahmad_agent"
            required
            style={inputStyle}
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>Official Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="a.rahimi@registry.gov.af"
            required
            style={inputStyle}
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        {/* First Name */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="e.g., Ahmad"
            required
            style={inputStyle}
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        {/* Last Name */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="e.g., Rahimi"
            required
            style={inputStyle}
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>Access Password</label>
          <input
            type="password"
            name="password"
            placeholder="••••••••••••"
            required
            style={inputStyle}
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        {/* National ID */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>National ID / Tazkira Number</label>
          <input
            type="text"
            name="idNumber"
            placeholder="Unique Identity Key"
            required
            style={inputStyle}
            value={formData.idNumber}
            onChange={handleChange}
          />
        </div>

        {/* Gov Code */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>Government Authorization Code</label>
          <input
            type="text"
            name="govCode"
            placeholder="Gov-Issued Clearance Token"
            required
            style={inputStyle}
            value={formData.govCode}
            onChange={handleChange}
          />
        </div>

        {/* Office License */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>Office Brokerage License Number</label>
          <input
            type="text"
            name="licenseNumber"
            placeholder="e.g., L-49201"
            style={inputStyle}
            value={formData.licenseNumber}
            onChange={handleChange}
          />
        </div>

        {/* Location Metrics */}
        <div style={{ display: "flex", flexDirection: "column", gridColumn: "span 2" }}>
          <label style={labelStyle}>Jurisdiction / Location Metrics</label>
          <input
            type="text"
            name="locationMetrics"
            placeholder="e.g., Kabul District 4, Zone B Sector 3"
            required
            style={inputStyle}
            value={formData.locationMetrics}
            onChange={handleChange}
          />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid #edf2f7", paddingTop: "20px" }}>
        <button
          type="submit"
          style={{
            background: "linear-gradient(135deg, #319795 0%, #2b6cb0 100%)",
            border: "none",
            color: "#ffffff",
            padding: "10px 24px",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(49, 151, 149, 0.2)",
          }}
        >
          Provision Access Account
        </button>
      </div>
    </form>
  );
}