import React, { useState, ChangeEvent, FormEvent, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { registerAgent } from "../../api/authService";

interface AgentFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  idNumber: string;
  licenseNumber: string;
  locationText: string;
  locationMetrics: string;
  profilePicture: File | null;
}

export default function SalesAgentForm(): React.JSX.Element {
  const [formData, setFormData] = useState<AgentFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    idNumber: "",
    licenseNumber: "",
    locationText: "",
    locationMetrics: "",
    profilePicture: null,
  });

  const [uiMessage, setUiMessage] = useState({
    status: null as "success" | "error" | null,
    text: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [printData, setPrintData] = useState<any>(null);
  const printRef = useRef<HTMLDivElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, profilePicture: files?.[0] || null }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setUiMessage({ status: null, text: "" });

    try {
      const form = new FormData();
      form.append("email", formData.email);
      form.append("password", formData.password);
      form.append("first_name", formData.firstName);
      form.append("last_name", formData.lastName);
      form.append("phone_number", formData.phoneNumber);
      form.append("id_number", formData.idNumber);
      form.append("license_number", formData.licenseNumber);
      form.append("location_text", formData.locationText);
      
      const locationPayload = { coords: formData.locationMetrics };
      form.append("location_metrics", JSON.stringify(locationPayload));

      if (formData.profilePicture) {
        form.append("profile_picture", formData.profilePicture);
      }

      const result = await registerAgent(form);
      setPrintData(result.data.data); // Adjust based on your actual API response structure
      setUiMessage({ status: "success", text: "Agent registered successfully" });
    } catch (err: any) {
      console.error("FULL ERROR:", err?.response?.data);
      const errorText = err?.response?.data?.errors 
        ? JSON.stringify(err.response.data.errors) 
        : "Registration failed";
      setUiMessage({ status: "error", text: errorText });
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadPDF = async () => {
    if (!printRef.current) return;
    const canvas = await html2canvas(printRef.current, { scale: 2, useCORS: true });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("agent-profile.pdf");
  };

  // Styles remain same as your original code...
  const inputStyle: React.CSSProperties = { width: "100%", padding: "12px", marginBottom: "10px", borderRadius: "8px", border: "1px solid #ccc" };
  const buttonStyle: React.CSSProperties = { width: "100%", padding: "12px", background: "#2b6cb0", color: "#fff", border: "none", borderRadius: "8px", marginTop: "10px", cursor: "pointer" };

  if (printData) {
    return (
      <div style={{ padding: 20 }}>
        <div ref={printRef} style={{ background: "#fff", padding: 20 }}>
          <h2>Agent Profile</h2>
          <p>{printData.first_name} {printData.last_name}</p>
          <p>Auth Code: {printData.auth_code}</p>
        </div>
        <button onClick={downloadPDF} style={buttonStyle}>Download PDF</button>
        <button onClick={() => setPrintData(null)} style={buttonStyle}>Back</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <form onSubmit={handleSubmit}>
        <h2>Agent Registration</h2>
        {uiMessage.text && <p style={{ color: uiMessage.status === "error" ? "red" : "green" }}>{uiMessage.text}</p>}
        <input name="firstName" placeholder="First Name" onChange={handleChange} style={inputStyle} required />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} style={inputStyle} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} style={inputStyle} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} style={inputStyle} required />
        <input name="idNumber" placeholder="ID Number" onChange={handleChange} style={inputStyle} required />
        <input name="licenseNumber" placeholder="License Number" onChange={handleChange} style={inputStyle} required />
        <input name="locationMetrics" placeholder="Lat/Lng" onChange={handleChange} style={inputStyle} />
        <input type="file" name="profilePicture" onChange={handleChange} />
        <button type="submit" disabled={isSubmitting} style={buttonStyle}>{isSubmitting ? "Loading..." : "Register Agent"}</button>
      </form>
    </div>
  );
}