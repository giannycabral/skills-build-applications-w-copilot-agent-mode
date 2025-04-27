import React, { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [nomeTime, setNomeTime] = useState('');
  const [mensagem, setMensagem] = useState('');
  const usuario = localStorage.getItem('usuarioOctofit');

  // Buscar times ao carregar o componente
  useEffect(() => {
    buscarTimes();
  }, []);

  const buscarTimes = () => {
    fetch('https://scaling-invention-5j5w6r4wqxqf4wpq-8000.app.github.dev/api/teams/')
      .then(response => response.json())
      .then(data => setTeams(data))
      .catch(error => setMensagem('Erro ao buscar times.'));
  };

  // Criar novo time
  const handleCriarTime = async (e) => {
    e.preventDefault();
    setMensagem('');
    const resp = await fetch('https://scaling-invention-5j5w6r4wqxqf4wpq-8000.app.github.dev/api/teams/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nomeTime, members: [usuario] }),
    });
    if (resp.ok) {
      setMensagem('Time criado com sucesso!');
      setNomeTime('');
      buscarTimes();
    } else {
      setMensagem('Erro ao criar time.');
    }
  };

  // Entrar em um time
  const handleEntrarTime = async (teamId) => {
    setMensagem('');
    const resp = await fetch(`https://scaling-invention-5j5w6r4wqxqf4wpq-8000.app.github.dev/api/teams/${teamId}/add_member/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: usuario }),
    });
    if (resp.ok) {
      setMensagem('Você entrou no time!');
      buscarTimes();
    } else {
      setMensagem('Erro ao entrar no time.');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>
      <h2 style={{ color: 'var(--accent)' }}>Times</h2>
      <form onSubmit={handleCriarTime} style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={nomeTime}
          onChange={e => setNomeTime(e.target.value)}
          placeholder="Nome do time"
          required
          style={{ padding: 8, borderRadius: 8, border: '1px solid #ccc', marginRight: 8 }}
        />
        <button type="submit" style={{ padding: 8, borderRadius: 8, background: 'var(--accent)', color: 'white', border: 'none' }}>
          Criar Time
        </button>
      </form>
      {mensagem && <p style={{ color: 'var(--highlight)' }}>{mensagem}</p>}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {teams.map(team => (
          <li key={team._id} style={{
            background: 'var(--card-bg)',
            borderRadius: 10,
            marginBottom: 16,
            padding: '16px 20px',
            boxShadow: '0 2px 8px #0001'
          }}>
            <strong style={{ color: 'var(--accent)' }}>{team.name}</strong> <br />
            <span style={{ fontSize: 14 }}>
              Membros: {Array.isArray(team.members) ? team.members.map(m => m.username || m).join(', ') : ''}
            </span>
            <br />
            <button
              onClick={() => handleEntrarTime(team._id)}
              style={{
                marginTop: 8,
                padding: '6px 16px',
                borderRadius: 8,
                background: 'var(--primary)',
                color: 'var(--accent)',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600
              }}
            >
              Entrar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teams;
