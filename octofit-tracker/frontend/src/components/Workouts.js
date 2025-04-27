import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Treinos() {
  const [treinos, setTreinos] = useState([]);
  const usuario = localStorage.getItem('usuarioOctofit');
  const navigate = useNavigate();

  useEffect(() => {
    const todosTreinos = JSON.parse(localStorage.getItem('treinosUsuario')) || [];
    setTreinos(todosTreinos.filter(t => t.usuario === usuario));
  }, [usuario]);

  const handleAdicionarTreino = () => {
    navigate('/nova-atividade');
  };

  return (
    <div>
      <h2>Meus Treinos</h2>
      <button
        onClick={handleAdicionarTreino}
        style={{
          background: 'var(--accent)',
          color: 'var(--primary)',
          fontWeight: 700,
          fontSize: '1rem',
          borderRadius: 10,
          padding: '10px 24px',
          marginBottom: 24,
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 2px 8px #0002'
        }}
      >
        Adicionar novo treino
      </button>
      {treinos.length === 0 ? (
        <p>Nenhum treino registrado ainda.</p>
      ) : (
        <ul>
          {treinos.map((treino, idx) => (
            <li key={idx}>
              <strong>{treino.tipo}</strong> - {treino.duracao} min {treino.descricao && `- ${treino.descricao}`} <br />
              <small>{new Date(treino.data).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Treinos;
