import { useState } from "react";

const columns = ["PENDING", "IN_REVIEW", "APPROVED", "REJECTED"];

export default function WorkflowBoard({ items }: any) {
  const [data, setData] = useState(items || []);

  const getItemsByStatus = (status: string) => {
    return data.filter((i: any) => i.status === status);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 16,
        marginTop: 20,
      }}
    >
      {columns.map((col) => (
        <div key={col} style={columnStyle}>
          <h3 style={{ marginBottom: 12 }}>{col}</h3>

          {getItemsByStatus(col).map((item: any) => (
            <div key={item.id} style={card}>
              <div style={{ fontSize: 13 }}>
                ID: {item.citizen_id || item.property_id || item.deal_id}
              </div>

              <div style={{ fontSize: 12, opacity: 0.7 }}>
                Status: {item.status}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

const columnStyle: any = {
  background: "#0d1b2a",
  color: "white",
  padding: 12,
  borderRadius: 10,
  minHeight: "400px",
};

const card: any = {
  background: "rgba(255,255,255,0.05)",
  padding: 10,
  borderRadius: 8,
  marginBottom: 10,
};