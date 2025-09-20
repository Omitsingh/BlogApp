import api from './api';

export const authAPI = {
  login: (email, password) => {
    return api.post('/auth/login', { email, password });
  },
  register: (username, email, password) => {
    return api.post('/auth/register', { username, email, password });
  }
};