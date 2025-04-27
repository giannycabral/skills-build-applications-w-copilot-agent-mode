import React, { useEffect, useState } from 'react';

function UserActivities() {
  const [atividades, setAtividades] = useState([]);
  const usuario = localStorage.getItem('usuarioOctofit');

  // Frases motivacionais aleatórias
  const frases = [
    "Continue se superando, cada treino conta!",
    "Você está no caminho certo, não desista!",
    "A sua dedicação faz a diferença!",
    "Movimente-se, seu corpo agradece!",
    "Orgulhe-se de cada conquista, por menor que seja!",
    "A persistência é o caminho do êxito!",
    "Hoje melhor que ontem, amanhã melhor que hoje",
  ];
  const fraseMotivacional = frases[Math.floor(Math.random() * frases.length)];

  useEffect(() => {
    const todasAtividades = JSON.parse(localStorage.getItem('treinosUsuario')) || [];
    setAtividades(todasAtividades.filter(a => a.usuario === usuario));
  }, [usuario]);

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <div style={{
        background: 'linear-gradient(135deg, var(--primary) 60%, var(--secondary) 100%)',
        borderRadius: 18,
        boxShadow: '0 4px 24px #0003',
        padding: '28px 24px 18px 24px',
        marginBottom: 28,
        color: 'var(--text)',
        textAlign: 'center'
      }}>
        <h2 style={{ margin: 0, fontWeight: 700, fontSize: '2rem', color: 'var(--accent)' }}>
          Olá, {usuario}!
        </h2>
        <p style={{ fontSize: '1.15rem', fontStyle: 'italic', marginTop: 12, color: 'var(--highlight)' }}>
          {fraseMotivacional}
        </p>
      </div>
      <h3 style={{ color: 'var(--accent)', marginBottom: 16 }}>Minhas Atividades</h3>
      {atividades.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--highlight)' }}>Nenhuma atividade registrada ainda.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {atividades.map((atividade, idx) => (
            <li key={idx} style={{
              background: 'var(--card-bg)',
              borderRadius: 12,
              marginBottom: 16,
              padding: '16px 20px',
              boxShadow: '0 2px 8px #0001'
            }}>
              <strong style={{ color: 'var(--accent)' }}>{atividade.tipo}</strong> — {atividade.duracao} min
              {atividade.descricao && <span> — {atividade.descricao}</span>}
              <br />
              <small style={{ color: '#888' }}>{new Date(atividade.data).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default UserActivities;
