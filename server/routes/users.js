import express from 'express';
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// READ ROUTES
router.get('/:id', verifyToken, getUser); // Query for a user by id
router.get('/friends/:id', verifyToken, getUserFriends); // Query for a user's friends by id

// UPDATE ROUTES
router.patch('/:id/:friendId', verifyToken, addRemoveFriend); // Add or remove a user's friend

export default router;