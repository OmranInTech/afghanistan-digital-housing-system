import axios from "axios";

const API = "http://localhost:8000/api";

export const dashboardService = {
  getPendingCitizens: async () => {
    const res = await axios.get(`${API}/workflow/citizens/pending/`);
    return res.data;
  },

  getPendingProperties: async () => {
    const res = await axios.get(`${API}/workflow/properties/pending/`);
    return res.data;
  },

  getPendingDeals: async () => {
    const res = await axios.get(`${API}/workflow/deals/pending/`);
    return res.data;
  },
};