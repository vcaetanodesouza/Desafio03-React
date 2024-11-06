import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

// .env das chaves do supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);


const Home = () => { //Componente Home
  const [userEmail, setUserEmail] = useState(''); // Variável pra armazenar o email
  const navigate = useNavigate(); // Redirecionamento de páginas


  useEffect(() => { // Verifica o ciclo de vida dos componentes, oberserva as mudanças que ocorrem na aplicação
    
    const fetchUser = async () => { // Verifica a sessão do usuário
      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        setUserEmail(session.user.email); // Define o email do usuário
      } else {
        navigate("/"); // Redireciona para login se não estiver logado
      }
    };

    fetchUser();
  }, [navigate]);


  const handleLogout = async () => { // Função de Logout
    await supabase.auth.signOut();
    navigate("/"); // Redireciona para login após logout
  };

  return (
    <div>
      <h1>Bem-vindo à Home</h1>
      <p>Email do usuário: {userEmail}</p>
      {/* Chama a função handleLogout  */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
