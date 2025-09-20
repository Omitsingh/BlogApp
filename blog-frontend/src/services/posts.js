import api from './api';

export const postsAPI = {
  getPosts: (page = 1, limit = 10) => {
    return api.get(`/posts?page=${page}&limit=${limit}`);
  },
  getPost: (id) => {
    return api.get(`/posts/${id}`);
  },
  createPost: (postData) => {
    return api.post('/posts', postData);
  },
  updatePost: (id, postData) => {
    return api.put(`/posts/${id}`, postData);
  },
  deletePost: (id) => {
    return api.delete(`/posts/${id}`);
  }
};