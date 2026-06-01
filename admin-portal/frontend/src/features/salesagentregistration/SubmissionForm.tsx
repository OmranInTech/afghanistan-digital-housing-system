import React, { useState, ChangeEvent, FormEvent } from "react";

// 1. Define the exact shape of your state
interface AgentFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  govCode: string;
  role: "AGENT" | "ADMIN"; // Strict literal type matching your ENUM
  idNumber: string;
  licenseNumber: string;
  locationMetrics: string;
}

export default function SalesAgentForm(): React.JSX.Element {
  const [formData, setFormData] = useState<AgentFormData>({
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

  // FIX 1: Explicitly cast the target element using a union type.
  // This tells TypeScript that the target can be either an Input or Select element,
  // making 'name' and 'value' perfectly safe to access.
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    
    setFormData((prevData) => ({
      ...prevData,
      // Using 'as keyof AgentFormData' prevents TS from complaining about string indexing
      [name]: value as AgentFormData[keyof AgentFormData],
    }));
  };

  // FIX 2: Enforce the FormEvent typing cleanly on the submission wrapper
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Submitting Premium Agent Payload: ", formData);
  };

  // Modern UI layout styling specs
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #cbd5e0",
    backgroundColor: "#ffffff",
    color: "#2d3748",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
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
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "24px",
          marginBottom: "32px",
        }}
      >
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
            required
            style={inputStyle}
            value={formData.licenseNumber}
            onChange={handleChange}
          />
        </div>

        {/* System Access Role */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={labelStyle}>Assigned System Role</label>
          {/* Note: We use readOnly instead of disabled so that the value is still readable by the form submission context if needed, without causing typed lock issues */}
          <select
            name="role"
            readOnly
            style={{ ...inputStyle, backgroundColor: "#f7fafc", cursor: "not-allowed" }}
            value={formData.role}
            onChange={handleChange}
          >
            <option value="AGENT">Field Registry Agent (Mobile App Access)</option>
            <option value="ADMIN">Central System Admin</option>
          </select>
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

      {/* Footer Controls */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "12px",
          borderTop: "1px solid #edf2f7",
          paddingTop: "20px",
        }}
      >
        <button
          type="button"
          style={{
            background: "transparent",
            border: "1px solid #cbd5e0",
            color: "#4a5568",
            padding: "10px 20px",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
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