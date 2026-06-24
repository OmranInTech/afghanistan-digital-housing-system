import WorkflowBoard from "../components/dashboard/WorkflowBoard";
import { useDashboard } from "../hooks/useDashboard";

export default function AdminDashboard() {
  const { citizens, properties, deals, loading } = useDashboard();

  if (loading) return <h2>Loading Dashboard...</h2>;

  const allItems = [
    ...citizens,
    ...properties,
    ...deals,
  ];

  return (
    <div>
      <h1>Government Workflow Dashboard</h1>

      <WorkflowBoard items={allItems} />
    </div>
  );
}