import { useState } from "react";
import InputField from "../Components/UI/TextField";
import { api } from "../Service/Service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserActive, setUserData } from "../Reducer/UserSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isNewUser, setNewUser] = useState(false);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // Apenas para cadastro
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Apenas para cadastro
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  const userIcon = `<g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></g>`;
  const lockIcon = `<g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor"><path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path><circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle></g>`;

  function handleNewUser(state) {
    setNewUser(state);
    setError(null);
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  async function authenticate(e) {
    setIsLoading(true)
    e.preventDefault();
    setError(null);

    if (isNewUser) {
      // Validação simples de senha
      if (password.length < 6) {
        return setError("A senha deve ter pelo menos 6 caracteres.");
      }

      if (password !== confirmPassword) {
        return setError("As senhas não coincidem.");
      }

      setIsLoading(true)

      try {
        await api.post("register/", {
          "username": username,
          "email": email,
          "password": password
        });
        
        login(true)
      } catch (err) {
        console.error("Erro ao registrar:", err);
        setIsLoading(false)
        const errorMsg = err?.response?.data?.username?.[0] || "Tente outro nome ou email.";
        setError(`Não foi possível criar a conta. ${errorMsg}`);
      }
    } else {
      setIsLoading(true)
      login()
    }
  }

  async function login(createdAccount = false) { 
    try {
      const response = await api.post("api/token/", {
        username: username,
        password: password,
      });

      const { access, refresh } = response.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("username", username);

      dispatch(setUserData(username))
      dispatch(setUserActive());
      setIsLoading(false)
      navigate("/");
    } catch (err) {
      setIsLoading(false)

      if (createdAccount) { 
        setNewUser(false);
        setPassword("");
        setConfirmPassword("");
        setError("Conta criada com sucesso. Faça login.");
      } else {
        console.error("Erro ao autenticar:", err);
        setError("Usuário ou senha inválidos.");
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="bg-base-100 shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isNewUser ? "Criar Conta" : "Login"}
        </h2>

        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={authenticate}>
          <InputField
            type="text"
            placeholder="Username"
            icon={userIcon}
            value={username}
            onChange={setUsername}
            required
          />

          {isNewUser && (
            <InputField
              type="email"
              placeholder="E-mail"
              icon={userIcon}
              value={email}
              onChange={setEmail}
              required
            />
          )}

          <InputField
            type="password"
            placeholder="Senha"
            icon={lockIcon}
            value={password}
            onChange={setPassword}
            required
          />

          {isNewUser && (
            <InputField
              type="password"
              placeholder="Confirme sua senha"
              icon={lockIcon}
              value={confirmPassword}
              onChange={setConfirmPassword}
              required
            />
          )}

      <button type="submit" className="btn btn-base-100 w-full mt-6" disabled={isLoading}>
        {isLoading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          isNewUser ? "Cadastrar" : "Entrar"
        )}
      </button>

        </form>

        {isNewUser ? (
          <p className="text-sm text-center mt-4">
            Já tem conta?{" "}
            <button
              className="text-primary underline cursor-pointer bg-transparent border-none p-0 m-0"
              onClick={() => handleNewUser(false)}
            >
              Login
            </button>
          </p>
        ) : (
          <p className="text-sm text-center mt-4">
            Ainda não tem conta?{" "}
            <button
              className="text-primary underline cursor-pointer bg-transparent border-none p-0 m-0"
              onClick={() => handleNewUser(true)}
            >
              Cadastre-se
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
