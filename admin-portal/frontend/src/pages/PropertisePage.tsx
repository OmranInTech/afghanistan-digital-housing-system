import { usePropertiesQueue } from "../hooks/usePropertiesQueue";

export default function PropertiesPage() {
  const { data, loading, action } = usePropertiesQueue();

  if (loading) return <h2>Loading Property Queue...</h2>;

  return (
    <div>
      <h1>Property Verification Queue</h1>

      <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
        {data.map((p) => (
          <div key={p.id} style={card}>
            
            <div>
              <strong>Property ID:</strong> {p.property_id}
            </div>

            <div>
              <strong>Status:</strong> {p.status}
            </div>

            <div style={{ marginTop: 10 }}>
              <button
                onClick={() => action(p.id, "APPROVE")}
                style={approveBtn}
              >
                Approve
              </button>

              <button
                onClick={() => action(p.id, "REJECT")}
                style={rejectBtn}
              >
                Reject
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

const card: any = {
  background: "#0d1b2a",
  color: "white",
  padding: 16,
  borderRadius: 12,
};

const approveBtn: any = {
  marginRight: 10,
  padding: "6px 12px",
  background: "#2ecc71",
  border: "none",
  color: "white",
  borderRadius: 6,
  cursor: "pointer",
};

const rejectBtn: any = {
  padding: "6px 12px",
  background: "#e74c3c",
  border: "none",
  color: "white",
  borderRadius: 6,
  cursor: "pointer",
};