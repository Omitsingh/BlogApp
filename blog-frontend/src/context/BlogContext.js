import React, { createContext, useContext, useState } from 'react';
import { postsAPI } from '../services/posts';
import { commentsAPI } from '../services/comments';

const BlogContext = createContext();

// Named exports
export const useBlog = () => {
  return useContext(BlogContext);
};

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [currentPost, setCurrentPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Posts functions
  const fetchPosts = async (page = 1, limit = 10) => {
    setLoading(true);
    try {
      const response = await postsAPI.getPosts(page, limit);
      
      // FIXED: Handle different response formats
      let postsData = [];
      if (Array.isArray(response.data)) {
        // Format: [{...}, {...}] (array directly)
        postsData = response.data;
      } else if (response.data && Array.isArray(response.data.posts)) {
        // Format: { posts: [{...}, {...}] }
        postsData = response.data.posts;
      } else if (response.data && response.data.data && Array.isArray(response.data.data.posts)) {
        // Format: { status: 'success', data: { posts: [{...}, {...}] } }
        postsData = response.data.data.posts;
      }
      
      setPosts(postsData);
      return postsData;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch posts');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchPost = async (id) => {
    setLoading(true);
    try {
      const response = await postsAPI.getPost(id);
      
      // FIXED: Handle different response formats
      let postData = null;
      if (response.data && response.data.post) {
        // Format: { post: {...} }
        postData = response.data.post;
      } else if (response.data && response.data.data && response.data.data.post) {
        // Format: { status: 'success', data: { post: {...} } }
        postData = response.data.data.post;
      } else if (response.data) {
        // Format: {...} (post object directly)
        postData = response.data;
      }
      
      setCurrentPost(postData);
      return postData;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch post');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (postData) => {
    setLoading(true);
    try {
      const response = await postsAPI.createPost(postData);
      
      // FIXED: Handle different response formats
      let newPost = null;
      if (response.data && response.data.post) {
        newPost = response.data.post;
      } else if (response.data && response.data.data && response.data.data.post) {
        newPost = response.data.data.post;
      } else if (response.data) {
        newPost = response.data;
      }
      
      if (newPost) {
        setPosts(prev => [newPost, ...prev]);
      }
      return newPost;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create post');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (id, postData) => {
    setLoading(true);
    try {
      const response = await postsAPI.updatePost(id, postData);
      
      // FIXED: Handle different response formats
      let updatedPost = null;
      if (response.data && response.data.post) {
        updatedPost = response.data.post;
      } else if (response.data && response.data.data && response.data.data.post) {
        updatedPost = response.data.data.post;
      } else if (response.data) {
        updatedPost = response.data;
      }
      
      if (updatedPost) {
        setPosts(prev => prev.map(post => 
          post._id === id ? updatedPost : post
        ));
        if (currentPost && currentPost._id === id) {
          setCurrentPost(updatedPost);
        }
      }
      return updatedPost;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update post');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    setLoading(true);
    try {
      await postsAPI.deletePost(id);
      setPosts(prev => prev.filter(post => post._id !== id));
      if (currentPost && currentPost._id === id) {
        setCurrentPost(null);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete post');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Comments functions
  const fetchComments = async (postId, page = 1, limit = 10) => {
    setLoading(true);
    try {
      const response = await commentsAPI.getComments(postId, page, limit);
      
      // FIXED: Handle different response formats
      let commentsData = [];
      if (Array.isArray(response.data)) {
        commentsData = response.data;
      } else if (response.data && Array.isArray(response.data.comments)) {
        commentsData = response.data.comments;
      } else if (response.data && response.data.data && Array.isArray(response.data.data.comments)) {
        commentsData = response.data.data.comments;
      }
      
      setComments(commentsData);
      return commentsData;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to fetch comments');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createComment = async (commentData) => {
    setLoading(true);
    try {
      const response = await commentsAPI.createComment(commentData);
      
      // FIXED: Handle different response formats
      let newComment = null;
      if (response.data && response.data.comment) {
        newComment = response.data.comment;
      } else if (response.data && response.data.data && response.data.data.comment) {
        newComment = response.data.data.comment;
      } else if (response.data) {
        newComment = response.data;
      }
      
      if (newComment) {
        setComments(prev => [newComment, ...prev]);
      }
      return newComment;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create comment');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateComment = async (id, commentData) => {
    setLoading(true);
    try {
      const response = await commentsAPI.updateComment(id, commentData);
      
      // FIXED: Handle different response formats
      let updatedComment = null;
      if (response.data && response.data.comment) {
        updatedComment = response.data.comment;
      } else if (response.data && response.data.data && response.data.data.comment) {
        updatedComment = response.data.data.comment;
      } else if (response.data) {
        updatedComment = response.data;
      }
      
      if (updatedComment) {
        setComments(prev => prev.map(comment => 
          comment._id === id ? updatedComment : comment
        ));
      }
      return updatedComment;
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update comment');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (id) => {
    setLoading(true);
    try {
      await commentsAPI.deleteComment(id);
      setComments(prev => prev.filter(comment => comment._id !== id));
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to delete comment');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError('');
  };

  const value = {
    posts,
    currentPost,
    comments,
    loading,
    error,
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost,
    fetchComments,
    createComment,
    updateComment,
    deleteComment,
    clearError
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};

// Default export
export default BlogContext;