import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Update as needed,
  withCredentials: true,

});

// Request interceptor to add token conditionally
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');

    // Skip adding token for register and login endpoints
    if (
      token &&
      !config.url.includes('/userapi/register/') &&
      !config.url.includes('/userapi/token/') &&
      !config.url.includes('/userapi/token/refresh/')
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization; // Ensure no token header on these endpoints
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling expired tokens and refreshing
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.code === 'token_not_valid' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token available');

        // Get new access token
        const res = await axios.post('http://localhost:8000/userapi/token/refresh/', {
          refresh: refreshToken,
        });

        const newAccessToken = res.data.access;
        localStorage.setItem('accessToken', newAccessToken);

        // Update Authorization header and retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // Redirect to login page on failure
      }
    }

    return Promise.reject(error);
  }
);

export default api;

