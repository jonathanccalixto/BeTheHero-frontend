import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

export default function Logon() {
  const [id, setId] = useState('');

  const history = useHistory();

  async function handleLogon (event) {
    event.preventDefault();

    try {
      const response = await api.post('sessions', { id });

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);

      history.push('/profile');
    } catch (error) {
      setId('');
      localStorage.removeItem('ongId');
      localStorage.removeItem('ongName');

      console.log('Falha no login, tente novamente.', error);
      alert('Falha no login, tente novamente.');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />

        <form onSubmit={handleLogon}>
          <h1>Faça seu Logon</h1>

          <input
            placeholder="Sua ID"
            value={id}
            onChange={event => setId(event.target.value)}
          />
          <button className="button" type="submit">Entrar</button>

          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}
