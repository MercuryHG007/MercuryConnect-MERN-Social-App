import Post from '../models/post.js';
import User from '../models/user.js';

// CREATE POST
export const createPost = async (req, res) => {
    try {
        const {userId, description, postImagePath } = new Post(req.body);
        const user = await User.findById(userId);

        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            postImagePath,
            profileImagePath: user.profileImagePath,
            likes: {},
            comments: []
        });

        await newPost.save();

        // GRABS ALL THE POSTS ALONG WITH NEWLY ADDED FROM THE DB FOR THE HOMEPAGE
        const postList = await Post.find();
        res.status(201).json(postList);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}

// GET POSTS
export const getFeedPosts = async (req, res) => {
    try {
        const postList = await Post.find();
        res.status(200).json(postList);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const userPosts = await Post.find({ userId });
        res.status(200).json(userPosts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// UPDATE POST
export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        /* IF THE LIKES OBJECT CONTAINS THE USER TRYING TO LIKE THE POST,
        THIS MEANS, THE USER HAS ALREADY LIKED THE POST AND IS TRYING TO UNLIKE IT,
        THEREFORE, WE DELETE THE USER FROM THE LIKES OBJECT */
        if(isLiked){
            post.likes.delete(userId);
        }
        /*ELSE USERID IS ADDED TO THE LIKES OBJECT WITH TRUE*/
        else{
            post.likes.set(userId, true);
        }

        //  UPDATES THE POST WITH THE NEW LIKES OBJECT
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            {likes: post.likes},
            {new: true}
        )

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
}