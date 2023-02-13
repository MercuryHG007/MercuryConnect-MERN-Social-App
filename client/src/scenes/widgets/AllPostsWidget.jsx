import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state";

import PostWidget from "./PostWidget";

const AllPostsWidget = ({ userId, isProfile = false }) => {

    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    const token = useSelector((state) => state.token);

    const getPosts = async () => {
        const response = await fetch(`http://localhost:3001/posts`, {
            method: "GET",
            // headers: { Authorization: `Bearer ${token}` }
        })
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    }

    const getUserPosts = async () => {
        const response = await fetch(`http://localhost:3001/posts/${userId}`, {
            method: "GET",
            // headers: { Authorization: `Bearer ${token}` }
        })
        const data = await response.json();
        dispatch(setPosts({ posts: data }));
    }

    useEffect(() => {
        if (isProfile) {
            getUserPosts();
        }
        else {
            getPosts();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            {[...posts].reverse().map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    postImagePath,
                    profileImagePath,
                    likes,
                    comments
                }) => (
                    <PostWidget
                        key={_id}
                        postId={_id}
                        postUserId={userId}
                        name={`${firstName} ${lastName}`}
                        description={description}
                        location={location}
                        postImagePath={postImagePath}
                        profileImagePath={profileImagePath}
                        likes={likes}
                        comments={comments}
                    />
                )
            )}
        </>
    )

}

export default AllPostsWidget;