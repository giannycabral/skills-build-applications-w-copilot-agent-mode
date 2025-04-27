import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);

  const usuario = localStorage.getItem('usuarioOctofit');
  const email = localStorage.getItem('emailOctofit');

  useEffect(() => {
    fetch('https://scaling-invention-5j5w6r4wqxqf4wpq-8000.app.github.dev/api/users/')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Erro ao buscar usuários:', error));
  }, []);

  return (
    <div>
      <h1>Usuários</h1>
      {usuario && (
        <div style={{
          background: 'var(--card-bg)',
          borderRadius: 12,
          padding: '12px 20px',
          margin: '0 auto 18px auto',
          maxWidth: 420,
          color: 'var(--text)',
          boxShadow: '0 2px 8px #0002',
          textAlign: 'center',
          fontWeight: 500
        }}>
          <p><strong>Usuário logado:</strong> {usuario}</p>
          <p><strong>E-mail:</strong> {email}</p>
        </div>
      )}
      {/* Removido a tabela de usuários */}
    </div>
  );
}

export default Users;
