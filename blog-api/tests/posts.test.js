const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

describe('Post Endpoints', () => {
  let authToken;
  let userId;
  let postId;

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
  });

  it('should create a new post', async () => {
    const res = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Test Post',
        content: 'This is a test post content',
        tags: ['test', 'javascript']
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data.post).toHaveProperty('title', 'Test Post');
    expect(res.body.data.post).toHaveProperty('content', 'This is a test post content');
  });

  it('should get all posts', async () => {
    // First create a post
    await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Test Post',
        content: 'This is a test post content'
      });

    const res = await request(app)
      .get('/api/posts')
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.posts).toHaveLength(1);
    expect(res.body.data.posts[0]).toHaveProperty('title', 'Test Post');
  });

  it('should get a single post', async () => {
    // First create a post
    const postRes = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Test Post for single',
        content: 'This is a test post content for single'
      });

    const createdPostId = postRes.body.data.post._id;

    const res = await request(app)
      .get(`/api/posts/${createdPostId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data.post).toHaveProperty('title', 'Test Post for single');
  });

  it('should not create post without authentication', async () => {
    const res = await request(app)
      .post('/api/posts')
      .send({
        title: 'This should fail',
        content: 'This post should not be created'
      });

    expect(res.statusCode).toEqual(401);
  });

  it('should update a post', async () => {
    // First create a post
    const postRes = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Original title',
        content: 'Original content'
      });

    const createdPostId = postRes.body.data.post._id;

    const updateRes = await request(app)
      .put(`/api/posts/${createdPostId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Updated title',
        content: 'Updated content'
      });

    expect(updateRes.statusCode).toEqual(200);
    expect(updateRes.body.data.post).toHaveProperty('title', 'Updated title');
    expect(updateRes.body.data.post).toHaveProperty('content', 'Updated content');
  });

  it('should delete a post', async () => {
    // First create a post
    const postRes = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Post to delete',
        content: 'This post will be deleted'
      });

    const createdPostId = postRes.body.data.post._id;

    const deleteRes = await request(app)
      .delete(`/api/posts/${createdPostId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(deleteRes.statusCode).toEqual(204);

    // Verify the post is actually deleted
    const getRes = await request(app)
      .get(`/api/posts/${createdPostId}`)
      .set('Authorization', `Bearer ${authToken}`);

    expect(getRes.statusCode).toEqual(404);
  });

  it('should return 404 for non-existent post', async () => {
    const res = await request(app)
      .get('/api/posts/507f1f77bcf86cd799439011') // Random ObjectId
      .set('Authorization', `Bearer ${authToken}`);

    expect(res.statusCode).toEqual(404);
  });
});