import express from "express";
import {
    getFeedPosts,
    getUserPosts,
    likePost
} from '../controllers/posts.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// READ ROUTES
router.get('/', verifyToken, getFeedPosts); // Query for all posts
router.get('/:userId/posts', verifyToken, getUserPosts); // Query for a user's posts by id'

// UPDATE ROUTES
router.patch('/:id/like', verifyToken, likePost); // Like a post

export default router;