import axios from 'axios';

const API_URL = '/expense';

export const getAllExpenses = (filter) => {
  return axios.post(`${API_URL}/filter`, filter);
};

export const getExpenseById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createExpense = (data) => {
  return axios.post(API_URL, data);
};

export const payExpense = (id) => {
  return axios.put(`${API_URL}/pay/${id}`);
}

export const deleteExpense = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
