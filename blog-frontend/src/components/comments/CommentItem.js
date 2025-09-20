import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useBlog } from '../../context/BlogContext';

const CommentItem = ({ comment }) => {
  const { isAuthenticated, currentUser } = useAuth();
  const { deleteComment } = useBlog();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      await deleteComment(comment._id);
    }
  };

  const isAuthor = isAuthenticated && currentUser.id === comment.author._id;

  return (
    <div className="comment-item">
      <div className="comment-header">
        <span className="comment-author">{comment.author.username}</span>
        <span className="comment-date">
          {new Date(comment.createdAt).toLocaleDateString()}
        </span>
      </div>
      <div className="comment-content">
        {comment.content}
      </div>
      {isAuthor && (
        <div className="comment-actions">
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentItem;