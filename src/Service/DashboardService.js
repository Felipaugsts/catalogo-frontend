import api from "./Service";
import { setLogoutUser } from "../Reducer/UserSlice";

// Função auxiliar de erro
function handleErrors(error, dispatch) {
  const status = error?.response?.status;
  if (status === 401) {
    dispatch(setLogoutUser());
  }
}

// Histórico de preço BTC
function fetchBitcoinHistory(interval, dispatch) {
  return api.post('/wallets/price-history/', { period: interval })
    .then(response => response.data)
    .catch(error => {
      console.error("Erro ao obter o histórico de preços do Bitcoin:", error);
      handleErrors(error, dispatch);
      throw error;
    });
}

// Preço atual do BTC
function fetchBitcoinPrice(dispatch) {
  return api.get('wallets/btc-price/')
    .then(response => response.data)
    .catch(error => {
      console.error("Erro ao buscar o preço do Bitcoin:", error);
      handleErrors(error, dispatch);
      throw error;
    });
}

// Carteiras
function fetchWallets(dispatch) {
  console.log("fetching wallets");
  return api.get('wallets/all-balances/')
    .then(response => response.data)
    .catch(error => {
      console.error("Erro ao buscar carteiras:", error);
      handleErrors(error, dispatch);
      throw error;
    });
}

// Criar nova carteira
function createWallet(payload, dispatch) {
  return api.post('wallets/', payload)
    .then(response => response.data)
    .catch(error => {
      console.error("Erro ao criar carteira:", error);
      handleErrors(error, dispatch);
      throw error;
    });
}

// Deletar carteira
function deleteWallet(id, dispatch) {
  return api.post(`wallets/${id}/delete/`)
    .then(response => response.data)
    .catch(error => {
      console.error("Erro ao deletar carteira:", error);
      handleErrors(error, dispatch);
      throw error;
    });
}

// Exporta o service
export default {
  fetchBitcoinHistory,
  fetchWallets,
  fetchBitcoinPrice,
  createWallet,
  deleteWallet
};
