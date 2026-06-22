import apiClient from "./apiClient";

export const dashboardService = {
  getStats: async () => {
    const res = await apiClient.get("/dashboard/stats/");
    return res.data;
  },

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
};