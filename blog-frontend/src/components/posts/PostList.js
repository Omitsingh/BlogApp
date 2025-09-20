import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../../context/BlogContext';
import PostItem from './PostItem';
import Pagination from '../common/Pagination';
import Loading from '../common/Loading';
import './Post.css';

const PostList = () => {
  const { posts, loading, fetchPosts } = useBlog();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  useEffect(() => {
    fetchPosts(currentPage, postsPerPage);
  }, [currentPage, postsPerPage]);

  if (loading) return <Loading />;

  return (
    <div className="post-list-container">
      <div className="post-list-header">
        <h1>Latest Posts</h1>
        <Link to="/create-post" className="create-post-btn">
          Create New Post
        </Link>
      </div>
      
      <div className="posts-grid">
        {posts.map(post => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(posts.length / postsPerPage)}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default PostList;