import React, { ChangeEvent, FormEvent, SFC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';

const Logon: SFC = () => {
  const history = useHistory();
  const [id, setId] = useState(``);

  async function handleLogin(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    try {
      const response = await api.post(`sessions`, { id });
      localStorage.setItem(`ongId`, id);
      localStorage.setItem(`ongName`, response.data.ong.name);
      history.push(`/profile`);
    } catch (err) {
      console.error(err); // eslint-disable-line
      alert(`Falha no login, tente novamente.`); // eslint-disable-line
    }
  }
  // 3835ced1debf
  return (
    <div className="logon-container">
      <section className="form">
        <img alt="Be The Hero" src={logoImg} />
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input
            onChange={(event: ChangeEvent<HTMLInputElement>): void => setId(event.target.value)}
            placeholder="Sua ID"
            value={id}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn color="#e02041" size={16} /> Não tenho cadastro
          </Link>
        </form>
      </section>
      <img alt="Heroes" src={heroesImg} />
    </div>
  );
};

export default Logon;
