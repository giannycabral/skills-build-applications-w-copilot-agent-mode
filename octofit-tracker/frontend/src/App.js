import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import UserActivities from './components/UserActivities';
import RegistroUsuario from './components/RegistroUsuario';
import NovaAtividade from './components/NovaAtividade';
import './App.css';

function App() {
  const [usuarioRegistrado, setUsuarioRegistrado] = useState(false);
  const [atividadeRegistrada, setAtividadeRegistrada] = useState(false);

  return (
    <Router>
      <div className="container">
        {!usuarioRegistrado ? (
          <RegistroUsuario onUsuarioRegistrado={() => setUsuarioRegistrado(true)} />
        ) : !atividadeRegistrada ? (
          <NovaAtividade onAtividadeCriada={() => setAtividadeRegistrada(true)} />
        ) : (
          <>
            <nav className="navbar navbar-expand-lg">
              <div className="container-fluid">
                <Link className="navbar-brand" to="/">OctoFit Tracker</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link className="nav-link" to="/leaderboard">Ranking</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/teams">Times</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/users">Usuários</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/workouts">Treinos</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/my-activities">Minhas Atividades</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <div className="mt-4">
              <Routes>
                <Route path="/activities" element={<Activities />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/users" element={<Users />} />
                <Route path="/workouts" element={<Workouts />} />
                <Route path="/my-activities" element={<UserActivities />} />
                <Route path="/nova-atividade" element={<NovaAtividade />} />
                <Route path="/" element={<h1>Bem-vindo ao OctoFit Tracker</h1>} />
              </Routes>
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
