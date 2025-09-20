import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const PostItem = ({ post }) => {
  const excerpt = post.content?.length > 150 
    ? `${post.content.substring(0, 150)}...` 
    : post.content;

  return (
    <article className="post-card">
      <Link to={`/posts/${post._id}`} className="post-title">
        <h2>{post.title}</h2>
      </Link>

      <div className="post-meta">
        <span>By {post.author?.username ?? "Unknown Author"}</span>
        <span>•</span>
        <span>{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : "N/A"}</span>
      </div>

      <div className="post-excerpt">
        <ReactMarkdown>{excerpt || ""}</ReactMarkdown>
      </div>

      {post.tags?.length > 0 && (
        <div className="post-tags">
          {post.tags.map(tag => (
            <span key={tag} className="tag">#{tag}</span>
          ))}
        </div>
      )}
    </article>
  );
};

export default PostItem;
