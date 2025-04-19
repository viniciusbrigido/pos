import axios from 'axios';

const API_URL = '/appointment_type';

export const getAllAppointmentTypes = () => {
  return axios.get(API_URL);
};

export const getAppointmentTypeById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createAppointmentType = (data) => {
  return axios.post(API_URL, data);
};

export const updateAppointmentType = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deleteAppointmentType = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
