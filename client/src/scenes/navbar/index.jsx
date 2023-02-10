import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from '@mui/material';

import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from '@mui/icons-material';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, setLogout } from '../../state';
import { useNavigate } from 'react-router-dom';
import FlexBetween from '../../components/FlexBetween';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const [isMobileMenuToggeled, setIsMobileMenuToggeled] = useState(false);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const neutralDark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user.firstName} ${user.lastName}`;


  return (
    <FlexBetween
      padding="1rem 6%"
      backgroundColor={alt}
    >
      <FlexBetween
        gap="1.75rem"
      >
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem,2rem,2.25rem)"
          color="primary"
          onClick={() => navigate('/home')}
          sx={{
            "&:hover": {
              cursor: "pointer",
              color: primaryLight,
            },
          }}
        >
          MercuryConnect
        </Typography>

        {isNonMobileScreens && (
          <FlexBetween
            backgroundColor={neutralLight}
            gap='3rem'
            borderRadius="9px"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
              <IconButton>
                <Search />
              </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween
          gap="2rem"
        >
          <IconButton
            onClick={() => dispatch(setMode())}
            sx={{
              fontSize: "25px"
            }}
          >
            {theme.palette.mode === 'dark' ? (
              <DarkMode
                sx={{
                  fontSize: "25px"
                }}
              />
            ) : (
              <LightMode
                sx={{
                  color: neutralDark,
                  fontSize: "25px"
                }}
              />
            )}
          </IconButton>
          <Message
            sx={{
              fontSize: "25px"
            }}
          />
          <Notifications
            sx={{
              fontSize: "25px"
            }}
          />
          <Help
            sx={{
              fontSize: "25px"
            }}
          />
          <FormControl
            variant='standard'
            value={fullName}
          >
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": { //This helps to target a specific class inside the component
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem
                value={fullName}
              >
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(setLogout())
                }}
              >
                Log Out
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggeled(!isMobileMenuToggeled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggeled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          maxWidth="500px"
          minWidth="300px"
          zIndex="10"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box
            display="flex"
            justifyContent="flex-end"
            p="1rem"
          >
            <IconButton
              onClick={() => setIsMobileMenuToggeled(!isMobileMenuToggeled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            gap="3rem"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{
                fontSize: "25px"
              }}
            >
              {theme.palette.mode === 'dark' ? (
                <DarkMode
                  sx={{
                    fontSize: "25px"
                  }}
                />
              ) : (
                <LightMode
                  sx={{
                    color: neutralDark,
                    fontSize: "25px"
                  }}
                />
              )}
            </IconButton>
            <Message
              sx={{
                fontSize: "25px"
              }}
            />
            <Notifications
              sx={{
                fontSize: "25px"
              }}
            />
            <Help
              sx={{
                fontSize: "25px"
              }}
            />
            <FormControl
              variant='standard'
              value={fullName}
            >
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": { //This helps to target a specific class inside the component
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem
                  value={fullName}
                >
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => dispatch(setLogout())}
                >
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}

    </FlexBetween>
  )
}

export default Navbar;