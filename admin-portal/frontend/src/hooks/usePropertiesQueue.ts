import { useEffect, useState } from "react";
import { workflowService } from "../api/workflowService";

export function usePropertiesQueue() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await workflowService.getPendingProperties();
    setData(res);
    setLoading(false);
  };

  const action = async (id: string, action: "APPROVE" | "REJECT") => {
    await workflowService.propertyAction(id, action);
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