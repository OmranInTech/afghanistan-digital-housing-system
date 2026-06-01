import Sidebar from "./Sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Sidebar />

      <div style={{ marginLeft: "260px", padding: "20px" }}>
        {children}
      </div>
    </div>
  );
}