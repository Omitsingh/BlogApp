const express = require('express');
const { body } = require('express-validator');
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPost);

router.use(auth); // All routes below require authentication

router.post('/', [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title must be less than 200 characters'),
  body('content')
    .notEmpty()
    .withMessage('Content is required')
], postController.createPost);

router.put('/:id', [
  body('title')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Title must be less than 200 characters'),
  body('content')
    .optional()
    .notEmpty()
    .withMessage('Content cannot be empty')
], postController.updatePost);

router.delete('/:id', postController.deletePost);

module.exports = router;