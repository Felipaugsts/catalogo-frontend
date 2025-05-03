import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi'; // Ícone de fechar
import { FiLoader } from 'react-icons/fi'; // Ícone de carregamento

const AddWalletModal = ({ isOpen, onClose, onAddWallet }) => {
  const [walletName, setWalletName] = useState('');
  const [xpub, setXpub] = useState('');
  const [loading, setLoading] = useState(false);

  // Resetar os campos quando o modal for aberto
  useEffect(() => {
    if (isOpen) {
      setWalletName('');
      setXpub('');
      setLoading(false);
    }
  }, [isOpen]); // O efeito será executado sempre que isOpen mudar

  const handleAddClick = async () => {
    if (walletName && xpub) {
      setLoading(true);
      try {
        await onAddWallet({ walletName, xpub });  // Espera a Promise ser resolvida
        setLoading(false);  // Desliga o loading
        onClose(); // Fecha o modal após adicionar
      } catch (error) {
        setLoading(false); // Desliga o loading em caso de erro
        // Trate o erro, se necessário
      }
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  };  

  return (
    <dialog id="add_wallet_modal" className={`modal ${isOpen ? 'modal-open' : ''}`}>
      <div className="modal-box relative text-white">
        {/* Ícone de Fechar */}
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-white hover:text-gray-300"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-xl font-semibold text-center mb-4">Adicionar Nova Carteira</h2>

        <div className="mb-4">
          <label htmlFor="walletName" className="block text-sm font-medium">
            Nome da Carteira
          </label>
          <input
            type="text"
            id="walletName"
            value={walletName}
            onChange={(e) => setWalletName(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nome da carteira"
            disabled={loading} // Desabilita o campo enquanto carrega
          />
        </div>

        <div className="mb-4">
          <label htmlFor="xpub" className="block text-sm font-medium">
            XPUB
          </label>
          <input
            type="text"
            id="xpub"
            value={xpub}
            onChange={(e) => setXpub(e.target.value)}
            className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite o XPUB da carteira"
            disabled={loading} // Desabilita o campo enquanto carrega
          />
        </div>

        <div className="flex justify-between">
          <button 
            onClick={onClose} 
            className="w-1/2 py-2 p-1 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 mr-5"
            disabled={loading} // Desabilita o botão enquanto carrega
          >
            Cancelar
          </button>
          <button 
            onClick={handleAddClick} 
            className={`w-1/2 py-2 text-white rounded-md ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={loading} // Desabilita o botão enquanto carrega
          >
            {loading ? (
              <FiLoader className="animate-spin mx-auto" size={20} /> // Spinner de carregamento
            ) : (
              'Adicionar'
            )}
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default AddWalletModal;
