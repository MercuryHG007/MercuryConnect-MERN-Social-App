import User from "../models/user.js";

// READ ROUTES

export const getUser = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
}

export const getUserFriends = async (req, res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);

        // Promise.all() is used to wait for all promises to be resolved
        const friends = await Promise.all( 
            user.friends.map((friendId) => User.findById(friendId))
        );

        const formattedFriends = friends.map(
            ({
                _id,
                firstName,
                lastName,
                profileImagePath,
                occupation,
                location,
            }) => {
                return {
                    _id,
                    firstName,
                    lastName,
                    profileImagePath,
                    occupation,
                    location,
                };
            }
        );
        res.status(200).json(formattedFriends);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
}

// UPDATE ROUTES

export const addRemoveFriend = async (req, res) => {
    try{
        const { id, friendId } = req.params;
        const user = await User.findById(id); // Finding the Main User who is adding/removing a friend by id
        const friend = await User.findById(friendId); // Finding the User who is being added/removed as a friend by id

        // If the friendId is in the user's friends array and userId in the friend's friends array, remove it
        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        }
        // Else, add the friendId to the user's friends array and userId to the friend's friends array
        else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }

        await user.save();
        await friend.save();

        // Promise.all() is used to wait for all promises to be resolved
        const friends = await Promise.all( 
            user.friends.map((friendId) => User.findById(friendId))
        );
        const formattedFriends = friends.map(
            ({
                _id,
                firstName,
                lastName,
                profileImagePath,
                occupation,
                location,
            }) => {
                return {
                    _id,
                    firstName,
                    lastName,
                    profileImagePath,
                    occupation,
                    location,
                };
            }
        );
        res.status(200).json(formattedFriends);
    }
    catch(err){
        res.status(404).json({message: err.message});
    }
}