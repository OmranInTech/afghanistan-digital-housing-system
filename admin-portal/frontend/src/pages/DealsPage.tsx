import { useDealsQueue } from "../hooks/useDealsQueue";

export default function DealsPage() {
  const { data, loading, action } = useDealsQueue();

  if (loading) return <h2>Loading Deal Workflow...</h2>;

  return (
    <div>
      <h1>Deal Workflow Queue</h1>

      <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
        {data.map((d) => (
          <div key={d.id} style={card}>
            
            <div>
              <strong>Deal ID:</strong> {d.deal_id}
            </div>

            <div>
              <strong>Status:</strong> {d.status}
            </div>

            <div style={{ marginTop: 10 }}>
              <button
                onClick={() => action(d.id, "APPROVE")}
                style={approveBtn}
              >
                Approve
              </button>

              <button
                onClick={() => action(d.id, "REJECT")}
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