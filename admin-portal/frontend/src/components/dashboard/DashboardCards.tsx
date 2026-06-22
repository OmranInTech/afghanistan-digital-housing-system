import { workflowService } from "../../api/workflowService";

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

            <button onClick={() => workflowService.citizenAction(c.id, "APPROVE").then(reload)}>
              Approve
            </button>

            <button onClick={() => workflowService.citizenAction(c.id, "REJECT").then(reload)}>
              Reject
            </button>
          </div>
        ))}
      </div>

      {/* PROPERTIES */}
      <div style={card}>
        <h3>Properties</h3>

        {properties.map((p: any) => (
          <div key={p.id} style={item}>
            <div>{p.property_id}</div>

            <button onClick={() => workflowService.propertyAction(p.id, "APPROVE").then(reload)}>
              Approve
            </button>

            <button onClick={() => workflowService.propertyAction(p.id, "REJECT").then(reload)}>
              Reject
            </button>
          </div>
        ))}
      </div>

      {/* DEALS */}
      <div style={card}>
        <h3>Deals</h3>

        {deals.map((d: any) => (
          <div key={d.id} style={item}>
            <div>{d.deal_id}</div>

            <button onClick={() => workflowService.dealAction(d.id, "APPROVE").then(reload)}>
              Approve
            </button>

            <button onClick={() => workflowService.dealAction(d.id, "REJECT").then(reload)}>
              Reject
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const card = {
  background: "#0d1b2a",
  color: "white",
  padding: 16,
  borderRadius: 12,
};

const item = {
  marginTop: 10,
  padding: 10,
  background: "rgba(255,255,255,0.05)",
  borderRadius: 8,
};