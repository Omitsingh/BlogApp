import React, { useEffect, useState } from 'react';
import { useBlog } from '../../context/BlogContext';
import CommentItem from './CommentItem';
import Loading from '../common/Loading';

const CommentList = ({ postId }) => {
  const { comments, loading, fetchComments } = useBlog();
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchComments(postId, page);
  }, [postId, page]);

  if (loading) return <Loading />;

  return (
    <div className="comments-list">
      {comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        comments.map(comment => (
          <CommentItem key={comment._id} comment={comment} />
        ))
      )}
    </div>
  );
};

export default CommentList;