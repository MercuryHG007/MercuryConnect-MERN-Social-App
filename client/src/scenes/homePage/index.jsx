import {
  Box, 
  useMediaQuery,
} from '@mui/material';

import { useSelector } from 'react-redux';

import Navbar from '../navbar';
import UserWidget from '../widgets/UserWidget';
import MyPostWidget from '../widgets/MyPostWidget';
import AllPostsWidget from '../widgets/AllPostsWidget';

const HomePage = () => {

  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)")
  const { _id, profileImagePath } = useSelector((state) => state.user);


  return (
    <Box>
      
      <Navbar />

      <Box
        width="100%"
        p="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box
          flexBasis={isNonMobileScreen ? "26%" : undefined}
        >
          <UserWidget
            userId={_id}
            profileImagePath={profileImagePath}
          />
        </Box>

        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
        >
          <MyPostWidget 
            profileImagePath={profileImagePath}
          />
          <AllPostsWidget 
            userId={_id}
          />
        </Box>

        {isNonMobileScreen && (
          <Box
            flexBasis="26%"
          >
            {/* SUGGESTIONS */}
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default HomePage;