import { FiEye, FiEyeOff, FiRefreshCw } from 'react-icons/fi';
import { FaBitcoin } from 'react-icons/fa';

const Header = ({ showBalance, toggleBalanceVisibility }) => (
  <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-6 px-4 shadow-lg">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold flex items-center">
          <FaBitcoin className="mr-2" /> Bitcoin Wallet
        </h1>
        <p className="text-blue-100">Dashboard</p>
      </div>
      <div className="flex items-center space-x-4">
        <button className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm flex items-center transition-all">
          <FiRefreshCw className="mr-1" /> Atualizar
        </button>
        <button
          onClick={toggleBalanceVisibility}
          className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-sm flex items-center transition-all"
        >
          {showBalance ? <FiEyeOff className="mr-1" /> : <FiEye className="mr-1" />}
          {showBalance ? 'Ocultar Saldo' : 'Mostrar Saldo'}
        </button>
      </div>
    </div>
  </div>
);

export default Header;
