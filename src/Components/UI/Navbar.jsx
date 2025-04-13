import CartButton from "./CartButton";
import { useNavigate } from 'react-router-dom';

const Navbar = ({ authenticated, cartItems, onClickLogout }) => {

  const navigate = useNavigate();

    function finalPrice() {
        return cartItems?.reduce((total, item) => total + Number(item.price), 0);
      }      

    return (
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
        <button
          className="btn btn-ghost text-xl"
          onClick={() => navigate('/')}
        >
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
                className="card card-compact dropdown-content bg-base-100 z-10 mt-3 w-52 shadow"
              >
                <div className="card-body">
                  <span className="text-lg font-bold">{cartItems?.length} Items</span>
                  <span className="text-info">Total: R$: {finalPrice()}</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-block">View cart</button>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Avatar / Menu do usuário */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="User Avatar"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
              >
                <li><button className="btn btn-ghost text-xl" onClick={onClickLogout}>Logout</button></li>
              </ul>
            </div>
          </div>
        ): (<button className="btn btn-ghost text-xl" onClick={() => navigate('/login')}>Login</button>)}
      </div>
    );
  };
  
  export default Navbar;
  