import React from 'react';
import { FiDownload, FiSend, FiArrowRight } from 'react-icons/fi';

const TransactionModal = ({ transaction, onClose, priceData }) => {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Detalhes da Transação</h2>
            <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>✕</button>
          </div>

          <div className="text-center mb-4">
            <div className={`p-4 rounded-full inline-block ${
              transaction.type === 'received' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'
            }`}>
              {transaction.type === 'received' ? <FiDownload className="text-3xl" /> : <FiSend className="text-3xl" />}
            </div>
            <p className={`text-2xl font-bold mt-4 ${transaction.type === 'received' ? 'text-green-600' : 'text-red-500'}`}>
              {transaction.type === 'received' ? '+' : '-'} {transaction.amount} BTC
            </p>
            <p className="text-gray-500">
              ~ R$ {(transaction.amount * priceData.currentPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium capitalize">{transaction.status}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Confirmações</p>
              <p className="font-medium">{transaction.confirmations}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Data e Hora</p>
              <p className="font-medium">{transaction.date} às {transaction.time}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">De</p>
              <p className="font-mono text-sm break-all">{transaction.from}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Para</p>
              <p className="font-mono text-sm break-all">{transaction.to}</p>
            </div>
            <div className="col-span-2">
              <p className="text-sm text-gray-500">Taxa</p>
              <p className="font-medium">{transaction.fee} BTC</p>
            </div>
            {transaction.memo && (
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Descrição</p>
                <p className="font-medium">{transaction.memo}</p>
              </div>
            )}
          </div>

          <div className="pt-4 flex justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
              <FiArrowRight className="mr-2" /> Ver no Explorador
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
