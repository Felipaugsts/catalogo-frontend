import React, { useState, useEffect } from "react";

export default function Card({ item, onClickAddToCart, cart, authenticated }) {
  const [itensOnCartLength, setItemOnCart] = useState(0);

  useEffect(() => {
    const itemsOnCart = cart?.filter((i) => i.productID === item.productID);
    setItemOnCart(itemsOnCart?.length || 0);
  }, [cart, item.productID]);

  // Renderizar estrelas
  const renderStars = () => {
    const maxRating = 5;
    const rating = item.rate || 0; // valor vindo da API
    const stars = [];

    for (let i = 1; i <= maxRating; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      );
    }

    return stars;
  };

  return (
    <div className="w-full bg-white rounded-xl shadow p-4 flex flex-col justify-between">
      {/* Imagem do produto */}
      <img
        src={item.imageUrl}
        alt={item.productName}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />

      {/* Informações do produto */}
      <h3 className="text-lg font-semibold text-gray-800">{item.productName}</h3>
      <p className="text-sm text-gray-600 mb-2">{item.description}</p>

      <div className="flex justify-between">
      {/* Preço */}
        <p className="text-gray-900 font-bold text-base mb-4">
          R$ {item.price.toFixed(2)}
        </p>

        {/* Rating */}
        <div className="flex items-center mb-2">
          {renderStars()}
          <span className="text-sm text-gray-500 ml-2">({item.rating || 0})</span>
        </div>
      </div>

      {/* Botão */}
      <button
        onClick={onClickAddToCart}
        className="btn w-full bg-base-100 text-gray-800 flex justify-between items-center hover:bg-base-200 transition-colors"
        disabled={!authenticated}
      >
        <span className="font-normal">Adicionar ao Carrinho</span>

        {itensOnCartLength > 0 && (
          <div className="badge text-gray-100 badge-sm badge-success">
            {itensOnCartLength}
          </div>
        )}
      </button>
    </div>
  );
}
