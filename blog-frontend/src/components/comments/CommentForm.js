import React, { useState } from 'react';
import { useBlog } from '../../context/BlogContext';
import { toast } from 'react-toastify';
import './Comment.css';

const CommentForm = ({ postId }) => {
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { createComment } = useBlog();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setSubmitting(true);
    try {
      await createComment({ content, postId });
      setContent('');
      toast.success('Comment added successfully!');
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <div className="form-group">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment..."
          rows="3"
          required
        />
      </div>
      <button 
        type="submit" 
        disabled={submitting || !content.trim()}
        className="submit-comment-btn"
      >
        {submitting ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
};

export default CommentForm;