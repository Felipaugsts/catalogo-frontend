import CartButton from "./CartButton";
import Rating from "./Rating";

const Card = ({item, onClickAddToCart}) => {
  return (
    <div className="card bg-base-100 w-96 shadow-sm hover:shadow-lg cursor-pointer ">
      <figure>
        <img src={item.imageUrl} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {item.title}
          {item.isNew && <div className="badge badge-secondary">Novo</div>}
        </h2>
        <div className="flex justify-between"> 
        <div >
          R$: {item.price}
        </div>

        <CartButton isCurrentItemOnCart={item} onClickCartButton={onClickAddToCart} />
        </div>
      </div>
    </div>
  );
};

export default Card;
