
import Card from "../Components/UI/Card";
import { useEffect, useState } from 'react';
import ThemeSwitcher from '../Components/UI/ThemeSwitcher';
import { useDispatch, useSelector } from "react-redux";
import { setTheme, setCartItem } from "../Reducer/UserSlice";
import api from '../Service/Service';

const Home = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.user.cartItems);
  const selectDarkMode = useSelector((state) => state.user.darkMode);
  const [productList, setProducts] = useState([])

  function handleAddToCart(item) {
    const updatedCart = [...cartItems, item];
    dispatch(setCartItem({ cartItem: updatedCart }));
  }

  function setDarkTheme(isDark) { 
    console.log(isDark)
    dispatch(
        setTheme(isDark)
    )
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        const products = response.data;
        setProducts(products)
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };
  
    fetchProducts();
  }, []);

  return ( 
    <div>
      <div className="flex flex-wrap gap-6 justify-end mt-10 rootBody">
        <ThemeSwitcher onToggle={setDarkTheme} isDark={selectDarkMode} />
      </div>

      <div className="flex flex-wrap gap-6 justify-start mt-10 rootBody">
        <h1 className="text-5xl font-bold">Catálogo de Flores!</h1>
        <div className="flex flex-wrap gap-6 justify-start mt-10">
          {productList.map((item) => (
            <Card
              key={item.productID}
              item={item}
              onClickAddToCart={() => handleAddToCart(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;