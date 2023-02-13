import {
  Box,
  useMediaQuery,
} from '@mui/material';

import Navbar from '../navbar';
import FriendListWidget from '../widgets/FriendListWidget';
import MyPostWidget from '../widgets/MyPostWidget';
import AllPostsWidget from '../widgets/AllPostsWidget';
import UserWidget from '../widgets/UserWidget';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {

  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/users/${userId}`, {
      method: "GET",
      // Authorization: `Bearer ${token}`
    })
    const data = await response.json();
    setUser(data);
  }

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>

      <Navbar />

      <Box
        width="100%"
        p="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box
          flexBasis={isNonMobileScreen ? "26%" : undefined}
        >
          <UserWidget
            userId={userId}
            profileImagePath={user.profileImagePath}
          />
          <Box 
            m="2rem 0"
          />
          <FriendListWidget 
            userId={userId}
          />
        </Box>

        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
        >
          <MyPostWidget
            profileImagePath={user.profileImagePath}
          />
          <AllPostsWidget
            userId={userId}
            isProfile={true}
          />
        </Box>
      </Box>
    </Box>

  )
}

export default ProfilePage;