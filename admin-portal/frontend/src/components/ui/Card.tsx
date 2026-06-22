export default function Card({ title, children }: any) {
  return (
    <div
      style={{
        background: "#111B2E",
        padding: 16,
        borderRadius: 12,
        color: "#E5E7EB",
      }}
    >
      <h3 style={{ marginBottom: 12 }}>{title}</h3>
      {children}
    </div>
  );
}