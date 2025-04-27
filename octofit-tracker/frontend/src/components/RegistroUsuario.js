import React, { useState } from 'react';

function RegistroUsuario({ onUsuarioRegistrado }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Validação simples dos campos
  const validar = () => {
    if (!username.trim()) {
      setMensagem('Por favor, informe um nome de usuário.');
      return false;
    }
    if (!email.trim() || !email.includes('@')) {
      setMensagem('Por favor, informe um e-mail válido.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    if (!validar()) return;
    setCarregando(true);
    const novoUsuario = {
      username,
      email,
      password: 'senha123', // senha padrão para simulação
    };
    try {
      const resp = await fetch('https://scaling-invention-5j5w6r4wqxqf4wpq-8000.app.github.dev/api/users/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoUsuario),
      });
      if (resp.ok) {
        setMensagem('✅ Usuário registrado com sucesso!');
        setUsername('');
        setEmail('');
        localStorage.setItem('usuarioOctofit', username);
        localStorage.setItem('emailOctofit', email);
        if (onUsuarioRegistrado) onUsuarioRegistrado(username);
      } else {
        setMensagem('❌ Erro ao registrar usuário. Tente novamente.');
      }
    } catch (err) {
      setMensagem('⚠️ Não foi possível conectar ao servidor, mas você pode continuar usando o app localmente.');
      localStorage.setItem('usuarioOctofit', username); // Salva usuário para manter login
      localStorage.setItem('emailOctofit', email);
      if (onUsuarioRegistrado) onUsuarioRegistrado(username);
    }
    setCarregando(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{
      background: 'linear-gradient(135deg, var(--primary) 60%, var(--secondary) 100%)',
      borderRadius: 20,
      boxShadow: '0 6px 32px #0006',
      padding: 32,
      margin: '40px auto',
      color: 'var(--text)',
      maxWidth: 420,
      border: '2px solid var(--accent)'
    }}>
      <h2 style={{color: 'var(--accent)', marginBottom: 24, textAlign: 'center', letterSpacing: 1}}>Registrar Usuário</h2>
      <div style={{marginBottom: 20}}>
        <label style={{fontWeight: 600}}>Nome de Usuário:</label><br />
        <input type="text" required value={username} onChange={e => setUsername(e.target.value)} style={{padding: 10, borderRadius: 10, border: 'none', width: '100%', background: 'var(--card-bg)', color: 'var(--text)', fontWeight: 500}} />
      </div>
      <div style={{marginBottom: 20}}>
        <label style={{fontWeight: 600}}>E-mail:</label><br />
        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} style={{padding: 10, borderRadius: 10, border: 'none', width: '100%', background: 'var(--card-bg)', color: 'var(--text)', fontWeight: 500}} />
      </div>
      <button type="submit" className="btn" disabled={carregando} style={{
        width: '100%',
        background: 'var(--accent)',
        color: 'var(--primary)',
        fontWeight: 700,
        fontSize: '1.1rem',
        borderRadius: 12,
        padding: '14px 0',
        marginTop: 10,
        boxShadow: '0 2px 12px #0003',
        letterSpacing: 1,
        transition: 'background 0.2s, color 0.2s',
        border: 'none',
        cursor: carregando ? 'not-allowed' : 'pointer',
        opacity: carregando ? 0.7 : 1
      }}>{carregando ? 'Salvando...' : 'Registrar Usuário'}</button>
      {mensagem && <div style={{marginTop: 18, color: 'var(--highlight)', textAlign: 'center', fontWeight: 600}}>{mensagem}</div>}
    </form>
  );
}

export default RegistroUsuario;
