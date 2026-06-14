import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1/auth/register-agent/';

export const registerAgent = async (formData: FormData) => {
  return await axios.post(API_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};