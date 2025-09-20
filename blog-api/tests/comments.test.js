const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

describe('Comment Endpoints', () => {
  let authToken;
  let postId;
  let userId;

  beforeEach(async () => {
    // Clean up
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});

    // Create a test user
    const userRes = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'password123'
      });

    authToken = userRes.body.token;
    userId = userRes.body.data.user.id;

    // Create a test post
    const postRes = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Test Post',
        content: 'This is a test post content'
      });

    postId = postRes.body.data.post._id;
  });

  it('should create a new comment', async () => {
    const res = await request(app)
      .post('/api/comments')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        content: 'This is a test comment',
        postId: postId
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.comment).toHaveProperty('content', 'This is a test comment');
  });

  it('should get comments for a post', async () => {
    // First create a comment
    await request(app)
      .post('/api/comments')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        content: 'Test comment for retrieval',
        postId: postId
      });

    const res = await request(app)
      .get(`/api/comments?postId=${postId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.comments).toHaveLength(1);
    expect(res.body.data.comments[0]).toHaveProperty('content', 'Test comment for retrieval');
  });

  it('should not create comment without authentication', async () => {
    const res = await request(app)
      .post('/api/comments')
      .send({
        content: 'This should fail',
        postId: postId
      });

    expect(res.statusCode).toEqual(401);
  });

  it('should update a comment', async () => {
    // First create a comment
    const commentRes = await request(app)
      .post('/api/comments')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        content: 'Original comment',
        postId: postId
      });

    const commentId = commentRes.body.data.comment._id;

    const updateRes = await request(app)
      .put(`/api/comments/${commentId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        content: 'Updated comment content'
      });

    expect(updateRes.statusCode).toEqual(200);
    expect(updateRes.body.data.comment).toHaveProperty('content', 'Updated comment content');
  });

  it('should delete a comment', async () => {
    // First create a comment
    const commentRes = await request(app)
      .post('/api/comments')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        content: 'Comment to delete',
        postId: postId
      });

    const commentId = commentRes.body.data.comment._id;

    const deleteRes = await request(app)
      .delete(`/api/comments/${commentId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(deleteRes.statusCode).toEqual(204);
  });
});