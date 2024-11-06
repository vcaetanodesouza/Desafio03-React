import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import "./styles.css";

// Configure Supabase com as variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Função para tratar o cadastro
  const handleCadastro = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Erro ao cadastrar:', error.message);
    } else {
      console.log('Cadastro bem-sucedido!');
      navigate('/');
    }
  };

  return (
    <div className="container">
      <h2>Crie sua conta</h2>
      <form onSubmit={handleCadastro}>
        <div className="input-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            placeholder="exemplo@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            placeholder="Sua senha"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="cadastro-btn">Cadastrar</button>
      </form>
      <p>Já tem uma conta? <a href="/">Faça login</a></p>
    </div>
  );
};

export default Cadastro;
