import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useBlog } from "../../context/BlogContext";
import "./Pages.css";

const Profile = () => {
  const { currentUser } = useAuth();
  const { posts, deletePost, loading } = useBlog();

  if (!currentUser) {
    return (
      <div className="page">
        <h2>You must be logged in to view your profile.</h2>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page">
        <h2>Loading your posts...</h2>
      </div>
    );
  }

  // Fix: Compare author ID with current user ID
  const userPosts = posts.filter((post) => {
    // Handle different author formats
    if (typeof post.author === 'object' && post.author._id) {
      return post.author._id === currentUser.id;
    }
    return post.author === currentUser.id;
  });

  const handleDelete = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      await deletePost(postId);
    }
  };

  return (
    <div className="page">
      <h2>{currentUser.username}'s Profile</h2>
      <p>Here are all the posts you've created:</p>

      {userPosts.length === 0 ? (
        <p>You haven't created any posts yet.</p>
      ) : (
        <div className="posts-list">
          {userPosts.map((post) => (
            <div key={post._id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.content.substring(0, 100)}...</p>
              <div className="post-meta">
                <span>Created: {new Date(post.createdAt).toLocaleDateString()}</span>
                {post.tags && post.tags.length > 0 && (
                  <div className="tags">
                    {post.tags.map(tag => (
                      <span key={tag} className="tag">#{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="post-actions">
                <Link to={`/edit-post/${post._id}`} className="btn">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;