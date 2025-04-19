import axios from 'axios';

const API_URL = '/auth';

export const login = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export const logout = () => {
  return axios.post(`${API_URL}/logout`);
};

export const changePassword = (credentials) => {
  return axios.post(`${API_URL}/change-password`, credentials);
};

export const validateToken = () => {
    return axios.get(`${API_URL}/validate`);
};
