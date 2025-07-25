import axios from "axios";

// Get the base URL from the environment variables we set on Vercel
const API_URL = import.meta.env.VITE_BASE_URL;

const API = axios.create({
  // Append '/api/v1' to the base URL for both development and production
  baseURL: `${API_URL}/api/v1`,
  withCredentials: true,
});

export default API;