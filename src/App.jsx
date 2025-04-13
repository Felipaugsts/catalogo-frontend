import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Scenes/Home';
import Navbar from './Components/UI/Navbar';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './Reducer/store';
import Login from './Scenes/Login';
import { useEffect } from 'react';
import api from './Service/Service';
import { setUserActive, setLogoutUser } from './Reducer/UserSlice';

const AppContent = () => {
  const selectDarkMode = useSelector((state) => state.user.darkMode);
  const authenticated = useSelector((state) => state.user.authenticated);
  const cartItems = useSelector((state) => state.user.cartItems);

  const dispatch = useDispatch();

  const accessToken = localStorage.getItem('access_token');
  const refreshTokenStored = localStorage.getItem('refresh_token');

  useEffect(() => {
    if (!authenticated && refreshTokenStored && accessToken) {
      refreshToken();
    }
  }, [authenticated]);

  async function refreshToken() {
    try {
      const response = await api.post('/api/token/refresh/', {
        refresh: refreshTokenStored,
      });

      const { access } = response.data;

      localStorage.setItem('access_token', access);
      dispatch(setUserActive());
    } catch (err) {
      dispatch(setLogoutUser());
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
  }

  return (
    <div data-theme={selectDarkMode ? 'dim' : 'autumn'}>
      <BrowserRouter>
      <Navbar
        authenticated={authenticated}
        onClickLogout={() => dispatch(setLogoutUser())}
        cartItems={cartItems}
      />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
