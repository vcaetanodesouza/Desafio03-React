// Imports
import React, { useState } from 'react';
import "./styles.css";
import vasco from "../../assets/CRVascodaGama.png";
import { useNavigate } from "react-router-dom";
import { createClient } from '@supabase/supabase-js';

// Chaves do supabase que são puxadas do .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


const Login = () => { // Componente inteiro
  const [email, setEmail] = useState(''); // Variável pra armazenar o email
  const [password, setPassword] = useState(''); // Variável pra armazenar a senha
  const navigate = useNavigate(); // Hook do React Router que redireciona pra outars páginas


  const handleLogin = async (e) => { // Função que lida com o processo de Login
    e.preventDefault(); // Impede o recarregamento automático da página

    const { user, error } = await supabase.auth.signInWithPassword({ email, password }); // Função do supabase pra autenticar o usuário

  // Tratamento de erros
    if (error) {
      console.error('Erro ao fazer login:', error.message);
    } else {
      console.log('Usuário logado:', user);
      navigate("/home"); // Redireciona para a página Home ao fazer login com sucesso
    }
  };

  const handleGoogleLogin = async () => { // Função que lida com o processo de login pelo Google
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' }); // Função do supabase que faz o login pelo Google

  //Tratamento de erros
    if (error) {
      console.error('Erro ao fazer login com Google:', error.message);
    }
  };

  // Renderiza o conteúdo da página
  return (
    <div className="container">
      <div className="left-section">
        <img src={vasco} className="imggg" alt="Logo" />
      </div>
      <div className="right-section">
        <form>
          <h2>Bem-vindo de volta</h2>
          <h3>Faça login na sua conta</h3>
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            {/* Atributos do campo email */}
            <input
              type="email"
              id="email"
              placeholder="exemplo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Evento que captura e atualiza o estado do campo email
            />
          </div>
          <div className="input-group">
            <label htmlFor="senha">Senha</label>
            {/* Atributos do campo senha */}
            <input
              type="password"
              id="senha"
              placeholder="0123456789"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Evento que captura e atualiza o estado do campo senha
            />
          </div>
          <div className="options">
            <label>
              <input type="checkbox" />
              Lembre de mim
            </label>
            <a href="#">Esqueceu sua senha?</a>
          </div>
          
          <button className="login-btn" onClick={handleLogin}>Entrar na conta</button> {/* onClick={handleLogin} chama uma ação */}
          <button type="button" className="google-login-btn" onClick={handleGoogleLogin}> {/* onClick={handleGoogleLogin} chama uma ação */}
            <img src="img/googleicon.png" alt="Google Icon" />
            Ou faça login com o Google
          </button>
        </form>
        <p>Não tem uma conta? <a href="#" onClick={() => navigate("/cadastro")}>Cadastre-se</a></p>
      </div>
    </div>
  );
};

export default Login;
