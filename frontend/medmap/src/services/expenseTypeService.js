import axios from 'axios';

const API_URL = '/expense_type';

export const getAllExpenseTypes = () => {
  return axios.get(API_URL);
};

export const getExpenseTypeById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createExpenseType = (data) => {
  return axios.post(API_URL, data);
};

export const updateExpenseType = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deleteExpenseType = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
