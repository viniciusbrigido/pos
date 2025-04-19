import axios from 'axios';

const API_URL = '/user';

export const getAllUsers = () => {
  return axios.get(API_URL);
};

export const createUser = (data) => {
  return axios.post(API_URL, data);
};

export const updateUser = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deleteUser = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
