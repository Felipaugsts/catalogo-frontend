import './App.css';
import Card from "./Components/Card";
import Navbar from './Components/Navbar';
import { useEffect, useState } from 'react';
import ThemeSwitcher from './Components/ThemeSwitcher';

const products = [
  {
    title: "Rosas Vermelhas",
    description: "Simbolizam o amor e a paixão, perfeitas para qualquer ocasião especial.",
    image: "https://img.freepik.com/fotos-gratis/close-up-de-uma-flor-roxa_181624-25863.jpg",
    isNew: true,
    rating: 3,
    price: 100
  },
  {
    title: "Orquídeas Exóticas",
    description: "Elegância e sofisticação em cada flor, um presente perfeito para quem você ama.",
    image: "https://services.meteored.com/img/article/belleza-a-prueba-de-sequia-las-mejores-flores-para-sobrevivir-al-verano-en-la-zona-central-de-chile-1725645418831_512.jpeg",
    isNew: false,
    rating: 1,
    price: 99.00
  },
  {
    title: "Girassóis Radiantes",
    description: "Flores que representam felicidade e otimismo, ideais para iluminar qualquer ambiente.",
    image: "https://www.dzoom.org.es/wp-content/uploads/2019/07/fotografia-flores-primavera-consejos.jpg",
    isNew: true,
    rating: 5,
    price: 100
  },
  {
    title: "Tulipas Coloridas",
    description: "Com suas cores vibrantes, as tulipas trazem frescor e vida para qualquer espaço.",
    image: "https://www.dzoom.org.es/wp-content/uploads/2019/07/fotografia-flores-primavera-consejos.jpg",
    isNew: false,
    rating: 2,
    price: 100
  },
];

const App = () => {
  const [isDarkTheme, setDarkTheme] = useState(false);
  const [cartItems, setCartItem] = useState([]);

  function handleAddToCart(item) {
    setCartItem((prevItems) => {
      return [...prevItems, item];
    });
  }

  useEffect(() => {
    console.log("Itens no carrinho:", cartItems.length);
  }, [cartItems]);

  return (
    <div data-theme={isDarkTheme ? "dim" : "autumn"}>
      <Navbar cartItems={cartItems} />
      <div className="flex flex-wrap gap-6 justify-end mt-10 rootBody">
        <ThemeSwitcher onToggle={setDarkTheme} />
      </div>

      <div className="flex flex-wrap gap-6 justify-start mt-10 rootBody">
        <h1 className="text-5xl font-bold">Catálogo de Flores!</h1>
        <div className="flex flex-wrap gap-6 justify-start mt-10">
          {products.map((item) => (
            <Card
              key={item.id}
              item={item}
              onClickAddToCart={() => handleAddToCart(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;