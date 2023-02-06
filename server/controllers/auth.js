import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

// REGISTER USER
export const register = async (req, res) => {
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            profileImagePath,
            friends,
            location,
            occupation,
            viewedProfile,
            impressions,
        } = req.body;

        // ENCRYPT PASSWORD
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash, // Store hash in the password DB instead of actual password
            profileImagePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000), //Assigned random number to viewedProfile instead of actual logic
            impressions: Math.floor(Math.random() * 10000), //Assigned random number to impressions instead of actual logic
        });

        // Save created user to DB
        const savedUser = await newUser.save();
        
        // Respond with a user object
        res.status(201).json(savedUser);

    }
    catch(err){
        res.status(500)
            .json({
                error: err.message,
            });
    }
}

// LOGIN USER
export const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email: email });
        if(!user) return res.status(400).json({ message: "User doesn't exist" });

        // Compare password entered by user with password in DB
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

        // Create and assign a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        
        // Delete the password from the user object before sending it to the frontend
        delete user.password;

        // Respond with a user object and a token
        res.status(200).json({
            user,
            token,
        });
    }
    catch(err){
        res.status(500)
            .json({
                error: err.message,
            });
    }
}