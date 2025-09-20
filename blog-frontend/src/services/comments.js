import api from './api';

export const commentsAPI = {
  getComments: (postId, page = 1, limit = 10) => {
    return api.get(`/comments?postId=${postId}&page=${page}&limit=${limit}`);
  },
  getComment: (id) => {
    return api.get(`/comments/${id}`);
  },
  createComment: (commentData) => {
    return api.post('/comments', commentData);
  },
  updateComment: (id, commentData) => {
    return api.put(`/comments/${id}`, commentData);
  },
  deleteComment: (id) => {
    return api.delete(`/comments/${id}`);
  }
};