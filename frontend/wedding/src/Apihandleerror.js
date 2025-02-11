import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Use the API base URL from the environment
});

// Interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // Redirect to login if unauthorized
      window.location.href = "users/login";
    }
    return Promise.reject(error);
  }
);

export default api;
