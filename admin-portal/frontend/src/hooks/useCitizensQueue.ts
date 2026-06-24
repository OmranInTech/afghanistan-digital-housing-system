import { useEffect, useState } from "react";
import { workflowService } from "../api/workflowService";

export function useCitizensQueue() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await workflowService.getPendingCitizens();
    setData(res);
    setLoading(false);
  };

  const action = async (id: string, action: "APPROVE" | "REJECT") => {
    await workflowService.citizenAction(id, action);
    await load(); // refresh queue
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