// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// Importar outros serviços quando precisar (ex: auth, firestore, storage)

const firebaseConfig = {
  apiKey: "AIzaSyBaXrkqLgODX9FnFcSxgKlRV3o5mBa7rNU",
  authDomain: "florist-catalog.firebaseapp.com",
  projectId: "florist-catalog",
  storageBucket: "florist-catalog.appspot.com",
  messagingSenderId: "421030363213",
  appId: "1:421030363213:web:447aa1d0dd1ed4eade1c04",
  measurementId: "G-CEFPGDX0RF"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa analytics (opcional - só funciona no ambiente do navegador)
if (typeof window !== "undefined") {
  getAnalytics(app);
}

export default app;
