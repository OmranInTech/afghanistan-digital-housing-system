import { useDashboard } from "../hooks/useDashboard";
import DashboardCards from "../components/dashboard/DashboardCards";

export default function AdminDashboard() {
  const { citizens, properties, deals, loading, reload } = useDashboard();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <DashboardCards
        citizens={citizens}
        properties={properties}
        deals={deals}
        reload={reload}
      />
    </div>
  );
}