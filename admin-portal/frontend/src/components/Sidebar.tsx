import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  UserPlus, 
  LayoutDashboard, 
  FileText, 
  Building2, 
  Users, 
  LogOut,
  ShieldCheck
} from "lucide-react"; // Highly recommended premium icon kit

export default function PremiumSidebar() {
  const location = useLocation();

  // Navigation schema for clean, scalable rendering
  const menuItems = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Agent Registration", path: "/sales-agent-registration", icon: UserPlus },
    { label: "Property Queue", path: "/properties", icon: Building2 },
    { label: "Identity Registry", path: "/citizens", icon: Users },
    { label: "Contracts & Deeds", path: "/contracts", icon: FileText },
  ];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "280px",
        height: "100vh",
        background: "#0d1b2a", // Premium dark sapphire slate
        color: "#f8f9fa",
        padding: "24px 16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: "4px 0 24px rgba(0, 0, 0, 0.15)",
        borderRight: "1px solid rgba(255, 255, 255, 0.05)",
        fontFamily: "'Inter', -apple-system, sans-serif",
      }}
    >
      {/* Top Section: Header & Links */}
      <div>
        {/* Core App Brand Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "0 8px" }}>
          <div style={{
            background: "linear-gradient(135deg, #319795 0%, #2b6cb0 100%)",
            padding: "8px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 12px rgba(49, 151, 149, 0.3)"
          }}>
            <ShieldCheck size={20} color="#ffffff" />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: "15px", fontWeight: 700, letterSpacing: "0.5px", color: "#ffffff" }}>
              DPID REGISTRY
            </h2>
            <span style={{ fontSize: "11px", color: "#718096", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>
              Gov Admin Console
            </span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ margin: "20px 0", height: "1px", background: "linear-gradient(to right, rgba(255,255,255,0.08), rgba(255,255,255,0.01))" }} />

        {/* Navigation Menu Grid */}
        <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  color: isActive ? "#ffffff" : "#a0aec0",
                  textDecoration: "none",
                  padding: "12px 14px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: isActive ? 600 : 500,
                  background: isActive ? "rgba(49, 151, 149, 0.15)" : "transparent",
                  borderLeft: isActive ? "3px solid #319795" : "3px solid transparent",
                  transition: "all 0.2s ease-in-out",
                  cursor: "pointer",
                }}
                // Inline hover simulations can alternatively be managed elegantly via standard CSS files or styled-components
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.03)";
                    e.currentTarget.style.color = "#ffffff";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#a0aec0";
                  }
                }}
              >
                <Icon size={18} style={{ color: isActive ? "#319795" : "#718096", transition: "color 0.2s" }} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section: Active Session Identity & Logout */}
      <div>
        <div style={{ margin: "16px 0", height: "1px", background: "rgba(255,255,255,0.06)" }} />
        
        <div style={{ 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "space-between",
          padding: "4px 8px"
        }}>
          {/* Identity Meta */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "#2d3748",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              fontSize: "13px",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#cbd5e0"
            }}>
              AD
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "#edf2f7" }}>Admin User</span>
              <span style={{ fontSize: "11px", color: "#a0aec0" }}>Kabul HQ</span>
            </div>
          </div>

          {/* Atomic Logout Button */}
          <button
            onClick={() => { /* Handle clear token handler routines */ }}
            style={{
              background: "transparent",
              border: "none",
              padding: "6px",
              borderRadius: "6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background 0.2s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = "rgba(229, 62, 62, 0.2)"}
            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
            title="Sign Out"
          >
            <LogOut size={16} color="#e53e3e" />
          </button>
        </div>
      </div>
    </div>
  );
}