import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  FileText,
  FileSignature,
  ShieldCheck,
  FolderOpen,
} from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const items = [
    { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { label: "Citizens Queue", path: "/citizens", icon: Users },
    { label: "Property Queue", path: "/properties", icon: Building2 },
    { label: "Deals Workflow", path: "/deals", icon: FileSignature },
    { label: "Contracts", path: "/contracts", icon: FileText },
    { label: "Documents", path: "/documents", icon: FolderOpen },
    { label: "Verification", path: "/verification", icon: ShieldCheck },
  ];

  return (
    <div
      style={{
        width: "280px",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        background: "linear-gradient(180deg, #0b1220, #0d1b2a)",
        color: "#fff",
        padding: "22px 18px",
        boxShadow: "8px 0 30px rgba(0,0,0,0.25)",
      }}
    >
      <h2 style={{ marginBottom: 20 }}>DPID ADMIN</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {items.map((i) => {
          const Icon = i.icon;
          const active = location.pathname === i.path;

          return (
            <Link
              key={i.path}
              to={i.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 8,
                textDecoration: "none",
                color: active ? "#fff" : "#a0aec0",
                background: active ? "rgba(56,189,248,0.15)" : "transparent",
              }}
            >
              <Icon size={18} />
              {i.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}