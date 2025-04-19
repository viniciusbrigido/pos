import axios from 'axios';

const API_URL = '/appointment';

export const getAllAppointments = (filter) => {
  return axios.post(`${API_URL}/filter`, filter);
};

export const getAppointmentById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const createAppointment = (data) => {
  return axios.post(API_URL, data);
};

export const payAppointment = (id) => {
  return axios.put(`${API_URL}/pay/${id}`);
}

export const deleteAppointment = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
