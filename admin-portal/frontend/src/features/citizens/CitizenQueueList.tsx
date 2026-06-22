export default function CitizenQueueList({ data, onAction }: any) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      {data.map((c: any) => (
        <div
          key={c.id}
          style={{
            background: "#0d1b2a",
            color: "white",
            padding: 16,
            borderRadius: 10,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div><b>Citizen ID:</b> {c.citizen_id}</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              Status: {c.status}
            </div>
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => onAction(c.id, "APPROVE")}
              style={btnApprove}
            >
              Approve
            </button>

            <button
              onClick={() => onAction(c.id, "REJECT")}
              style={btnReject}
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const btnApprove = {
  background: "#16a34a",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: 6,
  cursor: "pointer",
};

const btnReject = {
  background: "#dc2626",
  color: "white",
  border: "none",
  padding: "8px 12px",
  borderRadius: 6,
  cursor: "pointer",
};