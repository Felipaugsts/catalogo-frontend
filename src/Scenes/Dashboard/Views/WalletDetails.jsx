import React from 'react';
import { FiCopy } from 'react-icons/fi';

const WalletDetails = ({ activeWallet, showBalance, copyToClipboard, onDelete }) => {
  if (!activeWallet) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-4">Detalhes da Carteira</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Nome</p>
          <p className="font-medium">{activeWallet.name}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Endereço</p>
          <div className="flex items-center">
            <p className="font-mono text-sm truncate">{activeWallet.address}</p>
            <button
              className="ml-2 text-blue-600 hover:text-blue-800"
              onClick={() => copyToClipboard(activeWallet.address)}
            >
              <FiCopy />
            </button>
          </div>
        </div>

        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-500 mb-1">Saldo</p>
            <p className="font-medium">
              {showBalance ? `${activeWallet.btcValue} BTC` : '••••••••'}
            </p>
            <p className="text-sm text-gray-500">
              {showBalance
                ? `~ R$ ${activeWallet.fiatValue.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                  })}`
                : '••••••••'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Variação 24h</p>
            <p
              className={`font-medium ${
                activeWallet.change >= 0 ? 'text-green-600' : 'text-red-500'
              }`}
            >
              {activeWallet.change >= 0 ? '+' : ''}
              {activeWallet.change}%
            </p>
          </div>
        </div>
      </div>

      {/* Botão Deletar Carteira */}
      <div className="mt-6">
        <button
          onClick={() => onDelete(activeWallet.id)}
          className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Deletar Carteira
        </button>
      </div>
    </div>
  );
};

export default WalletDetails;
