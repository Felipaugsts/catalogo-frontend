import { useState } from "react";
import InputField from "../Components/UI/TextField";
import api from "../Service/Service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserActive } from "../Reducer/UserSlice";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const userIcon = `<g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g>`;
  const lockIcon = `<g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g>`;

  const authenticate = async (e) => {
    e.preventDefault(); // Evita reload da página
    setError(null);

    console.log("username", username);
    console.log("password", password);

    try {
      const response = await api.post("/api/token/", {
        username: username,
        password: password,
      });

      const { access, refresh } = response.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      dispatch(
        setUserActive()
      )

      navigate("/");

    } catch (err) {
      console.error("Erro ao autenticar:", err);
      setError("Usuário ou senha inválidos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="bg-base-100 shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={authenticate}>
          <InputField
            type="text"
            placeholder="Username"
            icon={userIcon}
            value={username}
            onChange={(e) => setUsername(e)}
            required
          />

          <InputField
            type="password"
            placeholder="Password"
            icon={lockIcon}
            value={password}
            onChange={(e) => setPassword(e)}
            required
          />

          <button type="submit" className="btn btn-primary w-full mt-6">
            Entrar
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Ainda não tem conta?{" "}
          <a className="text-primary underline cursor-pointer">Cadastre-se</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
