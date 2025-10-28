import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.message?.includes("E-mail já cadastrado")) {
          setError("Já existe uma conta com este e-mail.");
        } else if (data.message?.includes("Preencha todos os campos")) {
          setError("Preencha todos os campos obrigatórios.");
        } else {
          setError("Ocorreu um erro inesperado. Tente novamente.");
        }
        setLoading(false);
        return;
      }

      const loginRes = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginRes.json();

      if (loginRes.ok && loginData.token) {
        localStorage.setItem("token", loginData.token);
        localStorage.setItem("user", JSON.stringify(loginData.user));

        setSuccess("Conta criada com sucesso! Redirecionando...");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setError("Erro ao autenticar após o cadastro.");
      }
    } catch (err) {
      console.error("Erro:", err);
      setError("Erro ao conectar ao servidor. Verifique sua internet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Criar Conta</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <p>
          Já tem uma conta? <a href="/login">Entrar</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
