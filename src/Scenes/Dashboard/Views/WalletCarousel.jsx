import React from 'react';
import { FiTrendingUp, FiTrendingDown, FiPlus } from 'react-icons/fi'; 

const WalletCarousel = ({ wallets, activeWallet, handleWalletSelect, showBalance, isLoading, openAddNewWalletModal }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm pt-4 pl-4 pr-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Carteira</h2>
      </div>
      <div className="carousel carousel-center space-x-4 overflow-x-auto flex pb-2">
        {wallets.map((wallet) => (
          <div
            key={wallet.id}
            className={`carousel-item min-w-[280px] rounded-xl p-4 flex flex-col justify-between cursor-pointer transition-all duration-200 ${
              activeWallet === wallet.id 
                ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-md' 
                : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
            }`}
            onClick={() => handleWalletSelect(wallet.id)}
          >
            <div className="flex justify-between items-start">
              <h2 className={`font-bold text-sm ${activeWallet === wallet.id ? 'text-blue-100' : 'text-gray-600'} mb-1`}>
                {wallet.name}
              </h2>
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: wallet.color }}
              ></div>
            </div>
            <div className="my-2">
              <p className={`text-xl font-semibold ${activeWallet === wallet.id ? 'text-white' : 'text-gray-900'}`}>
                {showBalance ? `${wallet.btcValue} BTC` : '••••••••'}
              </p>
              <p className={`text-sm ${activeWallet === wallet.id ? 'text-blue-100' : 'text-gray-500'}`}>
                {showBalance ? `~ R$ ${wallet.fiatValue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '••••••••'}
              </p>
            </div>
            <div className="flex justify-between items-center mt-2">
              <span
                className={`text-sm font-medium px-2 py-1 rounded-full ${
                  wallet.change >= 0 
                    ? (activeWallet === wallet.id ? 'bg-green-500/30 text-green-100' : 'bg-green-100 text-green-600') 
                    : (activeWallet === wallet.id ? 'bg-red-500/30 text-red-100' : 'bg-red-100 text-red-500')
                }`}
              >
                {wallet.change >= 0 ? <FiTrendingUp className="inline mr-1" /> : <FiTrendingDown className="inline mr-1" />}
                {wallet.change >= 0 ? '+' : ''}{wallet.change}%
              </span>
              <span className={`text-xs ${activeWallet === wallet.id ? 'text-blue-100' : 'text-gray-500'}`}>
                {wallet.transactions} transações
              </span>
            </div>
          </div>
        ))}
      </div>

    {/* Botão redondo com ícone de + */}

        { 
            wallets.length >= 2 ? ( <></> ) : (  
        
      <div className='flex justify-end pb-2'> 
      <button 
        onClick={openAddNewWalletModal} 
        className="h-8 w-8 bg-blue-600 text-white rounded-full flex justify-center items-center shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        <FiPlus size={24} /> {/* O tamanho do ícone foi ajustado para caber bem */}
        </button>

      </div>
      ) }

      <div hidden={!isLoading} className='flex justify-center skeleton h-0.5 bg-white' />
    </div>
  );
};

export default WalletCarousel;

