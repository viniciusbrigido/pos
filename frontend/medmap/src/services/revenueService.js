import axios from 'axios';

const API_URL = '/revenue';

export const getAllRevenues = (filter) => {
  return axios.post(`${API_URL}/filter`, filter);
};

export const getRevenueById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createRevenue = (data) => {
  return axios.post(API_URL, data);
};

export const deleteRevenue = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
