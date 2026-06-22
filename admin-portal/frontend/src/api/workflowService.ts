import axios from "axios";

const API = "http://localhost:8000/api/workflow";

// --------------------
// GET PENDING QUEUES
// --------------------
export const workflowService = {
  async getPendingCitizens() {
    const res = await axios.get(`${API}/citizens/pending/`);
    return res.data;
  },

  async getPendingProperties() {
    const res = await axios.get(`${API}/properties/pending/`);
    return res.data;
  },

  async getPendingDeals() {
    const res = await axios.get(`${API}/deals/pending/`);
    return res.data;
  },

  // --------------------
  // ACTION APIs (FIXED)
  // --------------------
  async citizenAction(id: string, action: "APPROVE" | "REJECT") {
    const res = await axios.post(`${API}/citizen/${id}/action/`, {
      action,
    });
    return res.data;
  },

  async propertyAction(id: string, action: "APPROVE" | "REJECT") {
    const res = await axios.post(`${API}/property/${id}/action/`, {
      action,
    });
    return res.data;
  },

  async dealAction(id: string, action: "APPROVE" | "REJECT") {
    const res = await axios.post(`${API}/deal/${id}/action/`, {
      action,
    });
    return res.data;
  },
};