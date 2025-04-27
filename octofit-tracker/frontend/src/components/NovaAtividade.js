import React, { useState, useEffect } from 'react';

const tiposAtividade = [
  { value: 'corrida', label: 'Corrida' },
  { value: 'caminhada', label: 'Caminhada' },
  { value: 'ciclismo', label: 'Ciclismo' },
  { value: 'natacao', label: 'Natação' },
  { value: 'futebol', label: 'Futebol' },
  { value: 'basquete', label: 'Basquete' },
  { value: 'volei', label: 'Vôlei' },
  { value: 'pular_corda', label: 'Pular Corda' },
  { value: 'danca', label: 'Dança' },
  { value: 'yoga', label: 'Yoga/Alongamento' },
  { value: 'funcional', label: 'Treino Funcional' },
  { value: 'abdominais', label: 'Abdominais/Flexões/Agachamentos' },
  { value: 'escada', label: 'Subida de Escadas' },
  { value: 'skate', label: 'Skate/Patins' },
  { value: 'livre', label: 'Atividade Livre' },
];

function NovaAtividade({ onAtividadeCriada }) {
  const [tipo, setTipo] = useState('corrida');
  const [duracao, setDuracao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');

  // Recupera usuário do localStorage ao carregar o componente
  useEffect(() => {
    const userSalvo = localStorage.getItem('usuarioOctofit');
    const emailSalvo = localStorage.getItem('emailOctofit');
    if (userSalvo) setUsuario(userSalvo);
    if (emailSalvo) setEmail(emailSalvo);
  }, []);

  // Validação extra para duração
  const validar = () => {
    if (!duracao || isNaN(duracao) || Number(duracao) < 1) {
      setMensagem('Por favor, informe uma duração válida (mínimo 1 minuto).');
      return false;
    }
    if (!usuario) {
      setMensagem('Usuário não encontrado. Faça login novamente.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');
    if (!validar()) return;
    setCarregando(true);

    const novaAtividade = {
      user: usuario,
      email: email, // novo campo
      activity_type: tipo,
      duration: duracao,
      description: descricao,
      date: new Date().toISOString(),
    };
    try {
      const resp = await fetch('https://scaling-invention-5j5w6r4wqxqf4wpq-8000.app.github.dev/api/activities/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaAtividade),
      });
      if (resp.ok) {
        setMensagem('✅ Atividade registrada com sucesso!');
        setDuracao('');
        setDescricao('');
        if (onAtividadeCriada) onAtividadeCriada();
      } else {
        setMensagem('❌ Erro ao registrar atividade. Tente novamente.');
      }
    } catch (err) {
      setMensagem('⚠️ Não foi possível conectar ao servidor, mas sua atividade foi salva localmente.');
      setDuracao('');
      setDescricao('');
      if (onAtividadeCriada) onAtividadeCriada();
      // Aqui você pode salvar a atividade no localStorage para uso offline, se desejar
      const treinoSalvo = {
        usuario,
        email,
        tipo,
        duracao,
        descricao,
        data: new Date().toISOString()
      };
      const treinos = JSON.parse(localStorage.getItem('treinosUsuario')) || [];
      treinos.push(treinoSalvo);
      localStorage.setItem('treinosUsuario', JSON.stringify(treinos));
    }
    setCarregando(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} style={{
        background: 'linear-gradient(135deg, var(--primary) 60%, var(--secondary) 100%)',
        borderRadius: 20,
        boxShadow: '0 6px 32px #0006',
        padding: 32,
        marginBottom: 40,
        color: 'var(--text)',
        maxWidth: 420,
        margin: '0 auto 40px auto',
        border: '2px solid var(--accent)'
      }}>
        <h2 style={{color: 'var(--accent)', marginBottom: 24, textAlign: 'center', letterSpacing: 1}}>Registrar Nova Atividade</h2>
        <div style={{marginBottom: 20}}>
          <label style={{fontWeight: 600}}>Tipo de Atividade:</label><br />
          <select value={tipo} onChange={e => setTipo(e.target.value)} style={{padding: 10, borderRadius: 10, border: 'none', width: '100%', background: 'var(--card-bg)', color: 'var(--text)', fontWeight: 500}}>
            {tiposAtividade.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div style={{marginBottom: 20}}>
          <label style={{fontWeight: 600}}>Duração (minutos):</label><br />
          <input
            type="number"
            min="1"
            required
            value={duracao}
            onChange={e => setDuracao(e.target.value)}
            style={{padding: 10, borderRadius: 10, border: 'none', width: '100%', background: 'var(--card-bg)', color: 'var(--text)', fontWeight: 500}}
          />
        </div>
        <div style={{marginBottom: 20}}>
          <label style={{fontWeight: 600}}>Descrição (opcional):</label><br />
          <input
            type="text"
            value={descricao}
            onChange={e => setDescricao(e.target.value)}
            style={{padding: 10, borderRadius: 10, border: 'none', width: '100%', background: 'var(--card-bg)', color: 'var(--text)', fontWeight: 500}}
          />
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
        }}>{carregando ? 'Salvando...' : 'Registrar Atividade'}</button>
        {mensagem && <div style={{marginTop: 18, color: 'var(--highlight)', textAlign: 'center', fontWeight: 600}}>{mensagem}</div>}
      </form>
    </>
  );
}

export default NovaAtividade;
