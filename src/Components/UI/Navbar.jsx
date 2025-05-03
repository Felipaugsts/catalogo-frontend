import CartButton from "./CartButton";
import { useNavigate } from 'react-router-dom';

const Navbar = ({ authenticated, cartItems, onClickLogout, onRemoveItem }) => {
  const navigate = useNavigate();

  function finalPrice() {
    return cartItems?.reduce((total, item) => total + Number(item.price), 0).toFixed(2);
  }

  const generateWhatsAppMessage = () => {
    let message = "Olá, quero comprar esses itens: \n\n";
    cartItems.forEach(item => {
      message += `${item.title} - R$: ${item.price}\n`;
    });

    const phoneNumber = '5515996907676';
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="navbar bg-base-100 shadow-md fixed top-0 w-full z-50">
      <div className="flex-1">
        <button className="btn btn-ghost text-xl" onClick={() => navigate('/')}>
          Floricultura Brasil
        </button>
      </div>

      {authenticated ? (
        <div className="flex-none">

          {/* Carrinho */}
          <div className="dropdown dropdown-end">
            <CartButton itemsAddOnCart={cartItems?.length} />
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-10 mt-3 w-96 shadow max-h-[24rem] min-h-[10rem] overflow-y-auto"
            >
              <div className="card-body">
                <span className="text-lg font-bold">{cartItems?.length} itens</span>
                <span className="text-info font-bold">Total: R$: {finalPrice()}</span>

                <button
                  className="btn btn-success btn-xs mt-1"
                  onClick={generateWhatsAppMessage}
                >
                  Check out
                </button>

                {cartItems?.length > 0 ? (
                  Object.values(cartItems.reduce((acc, item) => {
                    if (!acc[item.productID]) {
                      acc[item.productID] = { ...item, quantity: 1 };
                    } else {
                      acc[item.productID].quantity += 1;
                    }
                    return acc;
                  }, {})).map((item, index) => (
                    <div key={index} className="card bg-base-100 card-xs shadow-sm flex items-center mb-2">
                      <div className="flex w-full">
                        <figure className="w-20 h-20 p-2">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="rounded-xl object-cover w-full h-full"
                          />
                        </figure>
                        <div className="card-body p-3 flex-1">
                          <div className="flex justify-between items-start">
                            <h2 className="card-title text-sm">{item.title}</h2>
                            {item.quantity > 1 && (
                              <div className="badge badge-success badge-sm text-white">{item.quantity}x</div>
                            )}
                          </div>
                          <div className="card-actions justify-between mt-2 space-x-1">
                          <p className="text-xs">R$: {(item.price * item.quantity).toFixed(2)}</p>
                            <button
                              className="btn btn-error btn-xs"
                              onClick={() => onRemoveItem(item)}
                            >
                              Remover
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 mt-2">Carrinho vazio.</p>
                )}
              </div>
            </div>
          </div>

          {/* Avatar */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-8 rounded-full">
                  <span className="text-xs">UI</span>
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <button className="btn btn-ghost text-xl" onClick={onClickLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button className="btn btn-ghost text-xl" onClick={() => navigate('/login')}>
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
