import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import { useAuth } from '../../context/AuthContext';
import ReactMarkdown from 'react-markdown';
import CommentList from '../comments/CommentList';
import CommentForm from '../comments/CommentForm';
import Loading from '../common/Loading';
import './Post.css';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentPost, loading, fetchPost, deletePost } = useBlog();
  const { isAuthenticated, currentUser } = useAuth();
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    fetchPost(id);
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(id);
      navigate('/');
    }
  };

  if (loading) return <Loading />;
  if (!currentPost) return <div>Post not found</div>;

  const isAuthor = isAuthenticated && currentUser.id === currentPost.author._id;

  return (
    <div className="post-detail-container">
      <article className="post-detail">
        <header className="post-header">
          <h1>{currentPost.title}</h1>
          <div className="post-meta">
            <span>By {currentPost.author.username}</span>
            <span>•</span>
            <span>{new Date(currentPost.createdAt).toLocaleDateString()}</span>
          </div>
          {isAuthor && (
            <div className="post-actions">
              <button 
                onClick={() => navigate(`/edit-post/${id}`)}
                className="edit-btn"
              >
                Edit
              </button>
              <button onClick={handleDelete} className="delete-btn">
                Delete
              </button>
            </div>
          )}
        </header>
        
        <div className="post-content">
          <ReactMarkdown>{currentPost.content}</ReactMarkdown>
        </div>

        {currentPost.tags && currentPost.tags.length > 0 && (
          <div className="post-tags">
            {currentPost.tags.map(tag => (
              <span key={tag} className="tag">#{tag}</span>
            ))}
          </div>
        )}
      </article>

      <div className="comments-section">
        <div className="comments-header">
          <h2>Comments</h2>
          <button 
            onClick={() => setShowComments(!showComments)}
            className="toggle-comments-btn"
          >
            {showComments ? 'Hide' : 'Show'} Comments
          </button>
        </div>

        {showComments && (
          <>
            {isAuthenticated && <CommentForm postId={id} />}
            <CommentList postId={id} />
          </>
        )}
      </div>
    </div>
  );
};

export default PostDetail;