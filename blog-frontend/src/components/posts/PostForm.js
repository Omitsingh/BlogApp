import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { toast } from 'react-toastify';

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createPost, updatePost, fetchPost, currentPost } = useBlog();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: ''
  });
  const [loading, setLoading] = useState(false);
  const isEditing = !!id;

  useEffect(() => {
    if (isEditing && currentPost) {
      setFormData({
        title: currentPost.title,
        content: currentPost.content,
        tags: currentPost.tags.join(', ')
      });
    } else if (isEditing) {
      fetchPost(id);
    }
  }, [id, isEditing, currentPost]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      if (isEditing) {
        await updatePost(id, postData);
        toast.success('Post updated successfully!');
      } else {
        await createPost(postData);
        toast.success('Post created successfully!');
      }
      
      navigate('/');
    } catch (error) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-form-container">
      <div className="post-form">
        <h2>{isEditing ? 'Edit Post' : 'Create New Post'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content (Markdown supported)</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="10"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="react, javascript, webdev"
            />
          </div>
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Saving...' : (isEditing ? 'Update Post' : 'Create Post')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostForm;