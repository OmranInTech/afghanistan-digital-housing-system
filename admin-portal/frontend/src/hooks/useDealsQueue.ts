import { useEffect, useState } from "react";
import { workflowService } from "../api/workflowService";

export function useDealsQueue() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await workflowService.getPendingDeals();
    setData(res);
    setLoading(false);
  };

  const action = async (id: string, action: "APPROVE" | "REJECT") => {
    await workflowService.dealAction(id, action);
    await load();
  };

  useEffect(() => {
    load();
  }, []);

  return {
    data,
    loading,
    reload: load,
    action,
  };
}