import axios from 'axios';

export const getAddressByZipCode = (zipCode) => {
  return axios.get(`https://viacep.com.br/ws/${zipCode}/json/`);
};