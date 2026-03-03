import axios from 'axios';

const API = axios.create({
  baseURL: 'https://portfolio-backend-2eql.onrender.com/api',
  timeout: 10000,
});

// Add auth token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('portfolio_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 responses
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('portfolio_token');
    }
    return Promise.reject(err);
  }
);

// Projects
export const getProjects = (params) => API.get('/projects', { params });
export const getProject = (id) => API.get(`/projects/${id}`);
export const createProject = (data) => API.post('/projects', data);
export const updateProject = (id, data) => API.put(`/projects/${id}`, data);
export const deleteProject = (id) => API.delete(`/projects/${id}`);

// Skills
export const getSkills = (params) => API.get('/skills', { params });
export const createSkill = (data) => API.post('/skills', data);
export const deleteSkill = (id) => API.delete(`/skills/${id}`);

// Contact
export const sendMessage = (data) => API.post('/contact', data);
export const getMessages = () => API.get('/contact');

// Auth
export const login = (data) => API.post('/auth/login', data);
export const verifyToken = () => API.get('/auth/verify');

export default API;
