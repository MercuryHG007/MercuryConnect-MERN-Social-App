import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
} from 'react-router-dom';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';

import { themeSettings } from './theme';
import HomePage from './scenes/homePage';
import LoginPage from './scenes/loginPage';
import ProfilePage from './scenes/profilePage';

function App() {

  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}> {/* THEME PROVIDER FOR MATERIAL UI */}
          <CssBaseline /> {/* RESETS THE CSS TO BASIC CSS FOR MATERIAL UI */}
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" 
              element={ 
                isAuth 
                  ? <HomePage />
                  : <Navigate to="/" />
              }
            />
            <Route path="/profile/:userId" 
              element={
                isAuth
                  ?<ProfilePage />
                  :<Navigate to="/" />
              } 
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
