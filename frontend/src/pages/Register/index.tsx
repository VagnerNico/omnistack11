import React, { ChangeEvent, FormEvent, SFC, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import './styles.css';

const Register: SFC = () => {
  const history = useHistory();
  const [data, setData] = useState<{ city: string; email: string; name: string; uf: string; whatsapp: string }>({
    city: ``,
    email: ``,
    name: ``,
    uf: ``,
    whatsapp: ``,
  });

  const { city, email, name, uf, whatsapp } = data;

  async function handleRegister(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    try {
      const response = await api.post(`ongs`, data);
      alert(`Seu ID de acesso: ${response.data.id}`); // eslint-disable-line
      history.push(`/`);
    } catch (err) {
      console.error(err); // eslint-disable-line
      alert(`Erro no cadastro, tente novamente.`); // eslint-disable-line
    }
  }

  const handleChange = (inputName: string) => (event: ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setData((prevData) => ({
      ...prevData,
      [inputName]: event.target.value,
    }));
  };

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img alt="Be The Hero" src={logoImg} />
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG.</p>
          <Link className="back-link" to="/">
            <FiArrowLeft color="#e02041" size={16} /> Não tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input onChange={handleChange(`name`)} placeholder="Nome da ONG" type="text" value={name} />
          <input onChange={handleChange(`email`)} placeholder="E-mail" type="email" value={email} />
          <input onChange={handleChange(`whatsapp`)} placeholder="WhatsApp" type="text" value={whatsapp} />
          <div className="input-group">
            <input onChange={handleChange(`city`)} placeholder="Cidade" type="text" value={city} />
            <input onChange={handleChange(`uf`)} placeholder="UF" style={{ width: 80 }} type="text" value={uf} />
          </div>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
