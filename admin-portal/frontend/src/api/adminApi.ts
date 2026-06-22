import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

// -------------------------
// CITIZENS
// -------------------------
export const getPendingCitizens = () =>
  API.get("/workflow/citizens/");

export const citizenAction = (id: string, action: string) =>
  API.post(`/workflow/citizen/${id}/action/`, { action });

// -------------------------
// PROPERTIES
// -------------------------
export const getPendingProperties = () =>
  API.get("/workflow/properties/");

export const propertyAction = (id: string, action: string) =>
  API.post(`/workflow/property/${id}/action/`, { action });

// -------------------------
// DEALS
// -------------------------
export const getPendingDeals = () =>
  API.get("/workflow/deals/");

export const dealAction = (id: string, action: string) =>
  API.post(`/workflow/deal/${id}/action/`, { action });