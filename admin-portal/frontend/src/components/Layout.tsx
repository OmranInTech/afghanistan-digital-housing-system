import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          marginLeft: "300px", // keeps separation clean
          padding: "24px",
          background: "#f5f7fb",
          minHeight: "100vh",
          overflowX: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}