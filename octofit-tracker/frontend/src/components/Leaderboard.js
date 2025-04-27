import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const usuarioLogado = localStorage.getItem('usuarioOctofit');

  useEffect(() => {
    fetch('https://scaling-invention-5j5w6r4wqxqf4wpq-8000.app.github.dev/api/leaderboard/')
      .then(response => response.json())
      .then(data => setLeaderboard(data))
      .catch(error => console.error('Erro ao buscar leaderboard:', error));
  }, []);

  return (
    <div>
      <h1>Classificação</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Posição</th>
            <th>Usuário</th>
            <th>Pontos</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, idx) => (
            <tr key={entry._id} style={entry.user === usuarioLogado ? {background: '#ffe'} : {}}>
              <td>{idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}</td>
              <td>{entry.user?.username || entry.user}</td>
              <td>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
