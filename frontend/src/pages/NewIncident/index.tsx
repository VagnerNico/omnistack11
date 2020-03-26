import React, { ChangeEvent, FormEvent, SFC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import './styles.css';

type NewIncidentType = {
  description: string;
  title: string;
  value: number;
};

const NewIncident: SFC = () => {
  const history = useHistory();
  const ongId = localStorage.getItem(`ongId`);
  const [data, setData] = useState<NewIncidentType>({
    description: ``,
    title: ``,
    value: 0,
  });
  const { description, title, value } = data;

  async function handleNewIncident(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    try {
      await api.post(`incidents`, data, {
        headers: {
          Authorization: ongId,
        },
      });
      history.push(`/profile`);
    } catch (err) {
      console.error(err); // eslint-disable-line
      alert(`Erro ao cadastro caso, tente novamente.`); // eslint-disable-line
    }
  }

  const handleChange = (inputName: string) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    event.persist();
    setData((prevData) => ({
      ...prevData,
      [inputName]: event.target.value,
    }));
  };

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img alt="Be The Hero" src={logoImg} />
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft color="#e02041" size={16} /> Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input onChange={handleChange(`title`)} placeholder="Título do caso" type="text" value={title} />
          <textarea onChange={handleChange(`description`)} placeholder="Descrição" value={description} />
          <input onChange={handleChange(`value`)} min="0" placeholder="Valor em R$" type="number" value={value} />
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewIncident;
