import { workflowService } from "../../../api/workflowService";

export default function DashboardCards({
  citizens,
  properties,
  deals,
  reload,
}: any) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
      
      {/* CITIZENS */}
      <div style={card}>
        <h3>Citizens</h3>

        {citizens.map((c: any) => (
          <div key={c.id} style={item}>
            <div>{c.citizen_id}</div>

            <div style={{ marginTop: 6 }}>
              <button
                onClick={async () => {
                  await workflowService.citizenAction(c.id, "APPROVE");
                  reload();
                }}
                style={approveBtn}
              >
                Approve
              </button>

              <button
                onClick={async () => {
                  await workflowService.citizenAction(c.id, "REJECT");
                  reload();
                }}
                style={rejectBtn}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* PROPERTIES */}
      <div style={card}>
        <h3>Properties</h3>

        {properties.map((p: any) => (
          <div key={p.id} style={item}>
            <div>{p.property_id}</div>

            <div style={{ marginTop: 6 }}>
              <button
                onClick={async () => {
                  await workflowService.propertyAction(p.id, "APPROVE");
                  reload();
                }}
                style={approveBtn}
              >
                Approve
              </button>

              <button
                onClick={async () => {
                  await workflowService.propertyAction(p.id, "REJECT");
                  reload();
                }}
                style={rejectBtn}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* DEALS */}
      <div style={card}>
        <h3>Deals</h3>

        {deals.map((d: any) => (
          <div key={d.id} style={item}>
            <div>{d.deal_id}</div>

            <div style={{ marginTop: 6 }}>
              <button
                onClick={async () => {
                  await workflowService.dealAction(d.id, "APPROVE");
                  reload();
                }}
                style={approveBtn}
              >
                Approve
              </button>

              <button
                onClick={async () => {
                  await workflowService.dealAction(d.id, "REJECT");
                  reload();
                }}
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

const item: any = {
  padding: 10,
  marginTop: 10,
  background: "rgba(255,255,255,0.05)",
  borderRadius: 8,
};

const approveBtn: any = {
  marginRight: 8,
  padding: "5px 10px",
  background: "#2ecc71",
  border: "none",
  color: "white",
  borderRadius: 5,
  cursor: "pointer",
};

const rejectBtn: any = {
  padding: "5px 10px",
  background: "#e74c3c",
  border: "none",
  color: "white",
  borderRadius: 5,
  cursor: "pointer",
};