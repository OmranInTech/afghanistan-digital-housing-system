import apiClient from "./apiClient";

export const workflowService = {
  // ---------------- PENDING QUEUES ----------------
  getPendingCitizens: async () => {
    const res = await apiClient.get("/workflow/citizens/pending/");
    return res.data;
  },

  getPendingProperties: async () => {
    const res = await apiClient.get("/workflow/properties/pending/");
    return res.data;
  },

  getPendingDeals: async () => {
    const res = await apiClient.get("/workflow/deals/pending/");
    return res.data;
  },

  // ---------------- ACTIONS ----------------
  citizenAction: async (id: string, action: "APPROVE" | "REJECT") => {
    const res = await apiClient.post(
      `/workflow/citizen/${id}/action/`,
      { action }
    );
    return res.data;
  },

  propertyAction: async (id: string, action: "APPROVE" | "REJECT") => {
    const res = await apiClient.post(
      `/workflow/property/${id}/action/`,
      { action }
    );
    return res.data;
  },

  dealAction: async (id: string, action: "APPROVE" | "REJECT") => {
    const res = await apiClient.post(
      `/workflow/deal/${id}/action/`,
      { action }
    );
    return res.data;
  },
};