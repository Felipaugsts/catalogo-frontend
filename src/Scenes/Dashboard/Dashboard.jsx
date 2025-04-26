import React, { useState, useEffect, act, useRef } from 'react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { FiSend, FiDownload, FiTrendingUp, FiTrendingDown, FiClock, FiRefreshCw, FiEye, FiEyeOff, FiCopy, FiArrowRight, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import { BsLightningChargeFill, BsQrCode } from 'react-icons/bs';
import { FaBitcoin, FaExchangeAlt } from 'react-icons/fa';
import { RiExchangeDollarLine } from 'react-icons/ri';
import DashboardService from '../../Service/DashboardService';
import Header from './Views/Header';
import 'react-loading-skeleton/dist/skeleton.css'; 
import NotificationBanner from './Views/NotificationBanner';
import WalletCarousel from './Views/WalletCarousel';
import PriceChart from './Views/PriceChart';
import WalletDetails from './Views/WalletDetails';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddWalletModal from './Views/NewWalletModal';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Dashboard = () => {
  const didLoadRef = useRef(false);
  const authenticated = useSelector((state) => state.user.authenticated);
  let navigate = useNavigate()
  const dispatch = useDispatch()
  // State for wallet data
  const [wallets, setWallets] = useState([]);
  const[isModalOpen, setIsModalOpen] = useState(false)

  // State for active wallet
  const [activeWallet, setActiveWallet] = useState(1);
  const [isChartLoading, setChartLoading] = useState(false);
  const [isLoadingWallet, setLoadingWallet] = useState(false);
  // State for price data
  const [priceData, setPriceData] = useState({
    currentPrice: 320000.00,
    change24h: 2.5,
    high24h: 325000.00,
    low24h: 315000.00,
  });

  // State for transaction history
  const [transactions, setTransactions] = useState([
    { 
      id: 1, 
      type: 'received', 
      amount: 0.001, 
      date: '2025-04-20', 
      time: '14:32',
      from: 'bc1q9h5yx...r0yz',
      to: 'bc1qxy2kg...0wlh',
      fee: 0.00001,
      confirmations: 24,
      status: 'confirmed',
      memo: 'Pagamento freelance'
    },
    { 
      id: 2, 
      type: 'sent', 
      amount: 0.002, 
      date: '2025-04-19', 
      time: '09:15',
      from: 'bc1qxy2kg...0wlh',
      to: 'bc1qm34ls...7s3h',
      fee: 0.00002,
      confirmations: 56,
      status: 'confirmed',
      memo: 'Compra online'
    },
    { 
      id: 3, 
      type: 'received', 
      amount: 0.0005, 
      date: '2025-04-18', 
      time: '18:45',
      from: 'bc1qm34ls...7s3h',
      to: 'bc1q9h5yx...r0yz',
      fee: 0.000008,
      confirmations: 89,
      status: 'confirmed',
      memo: ''
    },
    { 
      id: 4, 
      type: 'sent', 
      amount: 0.0003, 
      date: '2025-04-17', 
      time: '11:22',
      from: 'bc1q9h5yx...r0yz',
      to: 'bc1qxy2kg...0wlh',
      fee: 0.000015,
      confirmations: 120,
      status: 'confirmed',
      memo: 'Transferência para poupança'
    },
    { 
      id: 5, 
      type: 'received', 
      amount: 0.0012, 
      date: '2025-04-16', 
      time: '16:05',
      from: 'bc1qm34ls...7s3h',
      to: 'bc1q9h5yx...r0yz',
      fee: 0.00001,
      confirmations: 145,
      status: 'confirmed',
      memo: 'Reembolso'
    },
  ]);

  // State for price history data (for chart)
  const [priceHistory, setPriceHistory] = useState({
    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    datasets: [
      {
        label: 'Preço BTC (R$)',
        data: [0 ,0 ,0 ,0 ,0 ,0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: '#F7931A',
        backgroundColor: 'rgba(247, 147, 26, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  });

  // State for portfolio distribution
  const [portfolioData, setPortfolioData] = useState({
    labels: ['Carteira Principal', 'Carteira Poupança', 'Carteira Hardware'],
    datasets: [
      {
        data: [7500.50, 1623.78, 39840.00],
        backgroundColor: ['#F7931A', '#1E88E5', '#43A047'],
        borderWidth: 0,
      },
    ],
  });

  // State for time range
  const [timeRange, setTimeRange] = useState('1m');

  // State for showing/hiding balance
  const [showBalance, setShowBalance] = useState(true);

  // State for showing transaction details
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // State for notification
  const [notification, setNotification] = useState(null);

  // Function to handle wallet selection
  const handleWalletSelect = (id) => {
    setActiveWallet(id);
  };

  // Function to handle time range change
  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    console.log(range);
    setChartLoading(true)
  
    DashboardService.fetchBitcoinHistory(range, dispatch)
      .then(data => {
        setChartLoading(false)
        if (Array.isArray(data.labels) && data.labels.length > 0 && 
            Array.isArray(data.datasets[0].data) && data.datasets[0].data.length > 0) {
            setPriceHistory(data);
        } else { 
          console.log("empty value")
        }
      })
      .catch(error => {
        setChartLoading(false)
        console.error("Erro ao carregar o histórico de preços:", error);
      });
  };
  
  const fetchCurrentBitcoinPrice = () => { 
    DashboardService.fetchBitcoinPrice(dispatch)
      .then(data => {
        setLoadingWallet(false)
        console.log('btc price', data)
        setPriceData(data)
        console.log(data)
      })
      .catch(error => {
        setLoadingWallet(false)
        console.error("Erro ao carregar o histórico de preços:", error);
      });
  }

  const handleDeleteWallet = (id) => { 
    setLoadingWallet(true)
    DashboardService.deleteWallet(id, dispatch)
      .then(data => {
        fetchUserWallets()
      })
      .catch(error => {
        console.log("error 401", error.status)
        if (error.status == 401) { 
          console.log("error 401", error.status)
        }
        setLoadingWallet(false)
        console.error("Erro ao carregar o histórico de preços:", error.status);
      });
  }

  const handleAddWallet = ({ walletName, xpub }) => {
  const payload = {
    "name": walletName,
    "wallet_type": "watch-only",
    "xpub": xpub
  }
  DashboardService.createWallet(payload, dispatch)
    .then(data => {
      console.log(data)
      fetchUserWallets()
      setIsModalOpen(false)
    })
    .catch(error => {
      setIsModalOpen(false)
      console.error("Erro ao carregar o histórico de preços:", error);
    });
  }

  const fetchUserWallets = () => { 
    setLoadingWallet(true)

    DashboardService.fetchWallets(dispatch)
      .then(data => {
        setLoadingWallet(false)
        setWallets(data)
        console.log(data)
      })
      .catch(error => {
        setLoadingWallet(false)
        console.error("Erro ao carregar o histórico de preços:", error);
      });
  }

  const openAddNewWalletModal =() => { 
    console.log("clicked")
    setIsModalOpen(true)
  }

  // Function to toggle balance visibility
  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  // Function to copy address to clipboard
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showNotification('Endereço copiado para a área de transferência!', 'success');
  };

  // Function to show notification
  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  // Function to view transaction details
  const viewTransactionDetails = (transaction) => {
    setSelectedTransaction(transaction);
  };

  // Function to close transaction details modal
  const closeTransactionDetails = () => {
    setSelectedTransaction(null);
  };

  // Get active wallet data
  const getActiveWallet = () => {
    return wallets.find(wallet => wallet.id === activeWallet) || wallets[0];
  };

  // Calculate total portfolio value
  const getTotalPortfolioValue = () => {
    return wallets.reduce((total, wallet) => total + wallet.fiatValue, 0);
  };

  useEffect(() => {
    if (!didLoadRef.current) {
      didLoadRef.current = true;
      handleTimeRangeChange("1m");
      fetchUserWallets();
      fetchCurrentBitcoinPrice();

    }
  }, []);

  useEffect(() => {
    if (authenticated === false) {
      const timeout = setTimeout(() => {
        navigate('/login');
      }, 3000);
  
      // Cleanup se o componente desmontar ou se authenticated mudar
      return () => clearTimeout(timeout);
    }
  }, [authenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pb-10">
      {/* Header with gradient background */}
      <AddWalletModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onAddWallet={handleAddWallet} 
       />
      <Header  showBalance={showBalance} toggleBalanceVisibility={toggleBalanceVisibility}/>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 mt-6">
        <NotificationBanner notification={notification}/>

        <div className='flex justify-center p-2 h-10'>
            <span hidden={!isChartLoading} className="loading loading-spinner text-secondary" />    
        </div>
        
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Wallet Carousel */}
            <WalletCarousel 
              wallets={wallets}
              activeWallet={activeWallet}
              handleWalletSelect={handleWalletSelect}
              showBalance={showBalance}
              isLoading={isLoadingWallet}
              openAddNewWalletModal={openAddNewWalletModal}
            />

            {/* Price Chart */}
            <PriceChart 
              timeRange={timeRange}
              handleTimeRangeChange={handleTimeRangeChange}
              priceHistory={priceHistory}
           />

            {/* Transaction History
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Histórico de Transações</h2>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Ver todas
                </button>
              </div>
              <div className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-500 text-sm border-b">
                        <th className="pb-2 font-medium">Tipo</th>
                        <th className="pb-2 font-medium">Quantia</th>
                        <th className="pb-2 font-medium">Data</th>
                        <th className="pb-2 font-medium">Status</th>
                        <th className="pb-2 font-medium">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((tx) => (
                        <tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3">
                            <div className={`flex items-center ${tx.type === 'received' ? 'text-green-600' : 'text-red-500'}`}>
                              <div className={`p-2 rounded-full mr-2 ${tx.type === 'received' ? 'bg-green-100' : 'bg-red-100'}`}>
                                {tx.type === 'received' ? <FiDownload /> : <FiSend />}
                              </div>
                              <span className="capitalize">{tx.type === 'received' ? 'Recebido' : 'Enviado'}</span>
                            </div>
                          </td>
                          <td className="py-3">
                            <div className="font-medium">
                              {tx.type === 'received' ? '+' : '-'} {tx.amount} BTC
                            </div>
                            <div className="text-xs text-gray-500">
                              ~ R$ {(tx.amount * priceData.currentPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </div>
                          </td>
                          <td className="py-3">
                            <div>{tx.date}</div>
                            <div className="text-xs text-gray-500">{tx.time}</div>
                          </td>
                          <td className="py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              tx.status === 'confirmed' 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-yellow-100 text-yellow-600'
                            }`}>
                              {tx.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                            </span>
                          </td>
                          <td className="py-3">
                            <button 
                              className="text-blue-600 hover:text-blue-800"
                              onClick={() => viewTransactionDetails(tx)}
                            >
                              Detalhes
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            */}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Active Wallet Info */}
            <WalletDetails 
              activeWallet={getActiveWallet()} 
              showBalance={showBalance} 
              copyToClipboard={copyToClipboard}
              onDelete={handleDeleteWallet}
            />

            {/* Quick Actions 
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-4">Ações Rápidas</h2>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl flex flex-col items-center justify-center transition-all">
                  <FiDownload className="text-2xl mb-1" />
                  <span>Receber</span>
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl flex flex-col items-center justify-center transition-all">
                  <FiSend className="text-2xl mb-1" />
                  <span>Enviar</span>
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl flex flex-col items-center justify-center transition-all">
                  <RiExchangeDollarLine className="text-2xl mb-1" />
                  <span>Comprar</span>
                </button>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-xl flex flex-col items-center justify-center transition-all">
                  <BsLightningChargeFill className="text-2xl mb-1" />
                  <span>Lightning</span>
                </button>
              </div>
            </div>
            */}
            

            {/* Portfolio Distribution
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-4">Distribuição do Portfólio</h2>
              <div className="h-48 flex items-center justify-center">
                <Doughnut data={portfolioData} options={doughnutOptions} />
              </div>
              <div className="mt-4">
                <p className="text-center text-sm text-gray-500">Valor Total</p>
                <p className="text-center text-xl font-semibold">
                  {showBalance 
                    ? `R$ ${getTotalPortfolioValue().toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` 
                    : '••••••••'}
                </p>
              </div>
            </div>
            */}

            {/* Bitcoin Price Info */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-4">Cotação Bitcoin</h2>
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <FaBitcoin className="text-[#F7931A] text-2xl mr-2" />
                  <div>
                    <p className="font-medium">Bitcoin</p>
                    <p className="text-xs text-gray-500">BTC</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    R$ {priceData.currentPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  <p className={`text-sm ${priceData.change24h >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {priceData.change24h >= 0 ? '+' : ''}{priceData.change24h.toFixed(2)}%
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Máxima 24h</p>
                  <p className="font-medium">R$ {priceData.high24h.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500">Mínima 24h</p>
                  <p className="font-medium">R$ {priceData.low24h.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Detalhes da Transação</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={closeTransactionDetails}
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-center mb-4">
                  <div className={`p-4 rounded-full ${
                    selectedTransaction.type === 'received' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'
                  }`}>
                    {selectedTransaction.type === 'received' ? <FiDownload className="text-3xl" /> : <FiSend className="text-3xl" />}
                  </div>
                </div>
                
                <div className="text-center mb-4">
                  <p className={`text-2xl font-bold ${selectedTransaction.type === 'received' ? 'text-green-600' : 'text-red-500'}`}>
                    {selectedTransaction.type === 'received' ? '+' : '-'} {selectedTransaction.amount} BTC
                  </p>
                  <p className="text-gray-500">
                    ~ R$ {(selectedTransaction.amount * priceData.currentPrice).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <p className="font-medium capitalize">{selectedTransaction.status}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Confirmações</p>
                    <p className="font-medium">{selectedTransaction.confirmations}</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Data e Hora</p>
                  <p className="font-medium">{selectedTransaction.date} às {selectedTransaction.time}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">De</p>
                  <p className="font-mono text-sm break-all">{selectedTransaction.from}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Para</p>
                  <p className="font-mono text-sm break-all">{selectedTransaction.to}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-500">Taxa</p>
                  <p className="font-medium">{selectedTransaction.fee} BTC</p>
                </div>
                
                {selectedTransaction.memo && (
                  <div>
                    <p className="text-sm text-gray-500">Descrição</p>
                    <p className="font-medium">{selectedTransaction.memo}</p>
                  </div>
                )}
                
                <div className="pt-4 flex justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
                    <FiArrowRight className="mr-2" /> Ver no Explorador
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
