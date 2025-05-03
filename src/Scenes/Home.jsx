
import Card from "../Components/UI/Card";
import { useEffect, useState } from 'react';
import ThemeSwitcher from '../Components/UI/ThemeSwitcher';
import { useDispatch, useSelector } from "react-redux";
import { setTheme, setCartItem } from "../Reducer/UserSlice";
import { api } from '../Service/Service';
import FlowerBanner from "../Components/UI/FlowerPromo";
import SkeletonCard from "../Components/UI/CardSkeleton";

const Home = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.user.cartItems);
  const authenticated = useSelector((state) => state.user.authenticated);
  const [productList, setProducts] = useState([])
  const [isLoading, setLoader] = useState(false)

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
      setLoader(true)
      try {
        const response = await api.get('/products');
        const products = response.data;
        console.log("products", products)
        setLoader(false)
        setProducts(products)
      } catch (error) {
        setLoader(false)
        console.error("Erro ao buscar produtos:", error);
      }
    };
  
    fetchProducts();
  }, []);

  return ( 
    <div>
      <div className="flex flex-wrap gap-2 justify-center mt-10 rootBody">
      <h3 className="text-3xl text-gray-700 font-inter">Flores Online, Felicidade se cultiva!</h3>
      </div>
      
      <FlowerBanner />
      
      <div className="mt-10 px-4">
      <h4 className="text-3xl text-gray-700 font-inter mb-6 text-center">Flores do campo</h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))
        ) : (
          productList.map((item) => (
            <Card
              key={item.productID}
              item={item}
              onClickAddToCart={() => handleAddToCart(item)}
              cart={cartItems}
              authenticated={authenticated}
            />
          ))
        )}
      </div>
    </div>

    </div>
  );
};

export default Home;