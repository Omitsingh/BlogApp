// API Constants
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Local Storage Keys
export const LS_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme'
};

// Pagination Constants
export const PAGINATION = {
  POSTS_PER_PAGE: 10,
  COMMENTS_PER_PAGE: 5
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  USER: 'user',
  MODERATOR: 'moderator'
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  SERVER_ERROR: 'Server error. Please try again later.'
};

// Success Messages
export const SUCCESS_MESSAGES = {
  POST_CREATED: 'Post created successfully!',
  POST_UPDATED: 'Post updated successfully!',
  POST_DELETED: 'Post deleted successfully!',
  COMMENT_ADDED: 'Comment added successfully!',
  LOGIN_SUCCESS: 'Login successful!',
  REGISTER_SUCCESS: 'Registration successful!'
};

// Validation Rules
export const VALIDATION_RULES = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 30
  },
  PASSWORD: {
    MIN_LENGTH: 6
  },
  POST: {
    TITLE_MAX_LENGTH: 200,
    CONTENT_MIN_LENGTH: 10
  },
  COMMENT: {
    MAX_LENGTH: 1000
  }
};

// App Theme
export const APP_THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};