const express = require('express');
const { body } = require('express-validator');
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', commentController.getComments);
router.get('/:id', commentController.getComment);

router.use(auth); // All routes below require authentication

router.post('/', [
  body('content')
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ max: 1000 })
    .withMessage('Content must be less than 1000 characters'),
  body('postId')
    .notEmpty()
    .withMessage('Post ID is required')
], commentController.createComment);

router.put('/:id', [
  body('content')
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ max: 1000 })
    .withMessage('Content must be less than 1000 characters')
], commentController.updateComment);

router.delete('/:id', commentController.deleteComment);

module.exports = router;