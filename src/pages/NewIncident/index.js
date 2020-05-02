import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
  const ongId = localStorage.getItem('ongId');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  function setLogout() {
    localStorage.removeItem('ongId');
    localStorage.removeItem('ongName');

    history.push('/');
  }

  async function handleCreate (event) {
    event.preventDefault();

    const data = { title, description, value };

    try {
      await api.post('incidents', data, {
        headers: { Authorization: ongId },
      });

      history.push('/profile');
    } catch (error) {
      console.log('Erro ao cadastrar caso, tente novamente.', error.response.data);
      alert('Erro ao cadastrar caso, tente novamente.');
    }
  }

  if (!ongId) {
    setLogout();
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>

          <h1>Cadastrar novo caso</h1>
          <p>Descreva ocaso detalhadamente para encontrar um herói para resolver isso.</p>

          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleCreate}>
          <input
            placeholder="Titulo do caso"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={event => setValue(event.target.value)}
          />

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}
