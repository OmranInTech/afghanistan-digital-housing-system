import { useCitizensQueue } from "../hooks/useCitizensQueue";

export default function CitizensPage() {
  const { data, loading, action } = useCitizensQueue();

  if (loading) return <h2>Loading Citizens Queue...</h2>;

  return (
    <div>
      <h1>Citizen Verification Queue</h1>

      <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
        {data.map((c) => (
          <div key={c.id} style={card}>
            
            <div>
              <strong>Citizen ID:</strong> {c.citizen_id}
            </div>

            <div>
              <strong>Status:</strong> {c.status}
            </div>

            <div style={{ marginTop: 10 }}>
              <button
                onClick={() => action(c.id, "APPROVE")}
                style={approveBtn}
              >
                Approve
              </button>

              <button
                onClick={() => action(c.id, "REJECT")}
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