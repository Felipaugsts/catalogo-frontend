import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Scenes/Home';
import Navbar from './Components/Navbar';
import { Provider, useSelector } from 'react-redux';
import { store } from './Reducer/store';
const AppContent = () => {
  const selectDarkMode = useSelector((state) => state.user.darkMode);
  
  return (
    <div data-theme={selectDarkMode ? 'dim' : 'autumn'}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
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

