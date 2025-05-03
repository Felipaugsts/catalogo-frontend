import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Scenes/Home';
import Navbar from './Components/UI/Navbar';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store } from './Reducer/store';
import Login from './Scenes/Login';
import { useEffect } from 'react';
import {api} from './Service/Service';
import { setUserActive, setLogoutUser, setCartItem } from './Reducer/UserSlice';
import Footer from './Components/Footer';
import '../src/Service/firebase'

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

  function handleRemovedFromCart(item) {
    console.log("item removed", item);
  
    const index = cartItems.findIndex((i) => i.productID === item.productID);
    
    if (index !== -1) {
      const updatedCart = [...cartItems]; 
      updatedCart.splice(index, 1);
  
      dispatch(setCartItem({ cartItem: updatedCart }));
    }
  }

  return (
    <div data-theme={selectDarkMode ? 'dim' : 'garden'}>
      <BrowserRouter>
      <Navbar
        authenticated={authenticated}
        onClickLogout={() => dispatch(setLogoutUser())}
        cartItems={cartItems}
        onRemoveItem={(item) => handleRemovedFromCart(item)}
      />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>

        <Footer />
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
