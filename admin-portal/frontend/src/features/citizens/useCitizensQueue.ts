import { useEffect, useState } from "react";
import { workflowService } from "../../api/workflowService";

export function useCitizensQueue() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);

    const res = await workflowService.getPendingCitizens();

    setData(res);
    setLoading(false);
  };

  const action = async (id: string, type: "APPROVE" | "REJECT") => {
    await workflowService.actionCitizen(id, type);
    await load();
  };

  useEffect(() => {
    load();
  }, []);

  return { data, loading, reload: load, action };
}