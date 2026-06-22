import { useEffect, useState } from "react";
import { dashboardService } from "../api/dashboardServices";

export function useDashboard() {
  const [citizens, setCitizens] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);

    const [c, p, d] = await Promise.all([
      dashboardService.getPendingCitizens(),
      dashboardService.getPendingProperties(),
      dashboardService.getPendingDeals(),
    ]);

    setCitizens(c);
    setProperties(p);
    setDeals(d);

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return { citizens, properties, deals, loading, reload: load };
}