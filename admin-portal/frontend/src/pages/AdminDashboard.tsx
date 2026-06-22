import { useDashboard } from "../features/dashboard/hooks/useDashboard";
import DashboardCards from "../features/dashboard/components/DashboardCards";

export default function AdminDashboard() {
  const { citizens, properties, deals, loading, reload } = useDashboard();

  if (loading) return <h3>Loading...</h3>;

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