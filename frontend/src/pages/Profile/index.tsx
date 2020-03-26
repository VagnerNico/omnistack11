import React, { SFC, useEffect, useState, ReactElement } from 'react';
import { AxiosResponse } from 'axios';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

type IncidentType = {
  description: string;
  id: number;
  ong_id: string;
  title: string;
  value: number;
};

const Profile: SFC = () => {
  const history = useHistory();
  const [incidents, setIncidents] = useState<IncidentType[]>([]);

  const ongId = localStorage.getItem(`ongId`);
  const ongName = localStorage.getItem(`ongName`);

  useEffect(() => {
    api
      .get(`profile`, {
        headers: {
          Authorization: ongId,
        },
      })
      .then((response: AxiosResponse<IncidentType[]>) => {
        setIncidents(response.data);
      });
  }, [ongId]);

  async function handleDeleteIncident(id: number): Promise<void> {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        },
      });
      setIncidents((prevIncidents) => prevIncidents.filter((incident) => incident.id !== id));
    } catch (err) {
      alert(`Erro ao deletar caso, tente novamente.`); // eslint-disable-line
    }
  }

  function handleLogout(): void {
    localStorage.clear();
    history.push(`/`);
  }

  return (
    <div className="profile-container">
      <header>
        <img alt="Be The Hero" src={logoImg} />
        <span>Bem vinda, {ongName}</span>
        <Link className="button" to="/incident/new">
          Cadastrar novo caso
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower color="#e02041" size={19} />
        </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(
          (incident: IncidentType): ReactElement => (
            <li key={incident.id}>
              <strong>CASO:</strong>
              <p>{incident.title}</p>
              <strong>DESCRIÇÃO:</strong>
              <p>{incident.description}</p>
              <strong>VALOR:</strong>
              <p>{Intl.NumberFormat(`pt-br`, { currency: `BRL`, style: `currency` }).format(incident.value)}</p>
              <button onClick={(): Promise<void> => handleDeleteIncident(incident.id)} type="button">
                <FiTrash2 color="#a8a8b3" size={20} />
              </button>
            </li>
          ),
        )}
      </ul>
    </div>
  );
};

export default Profile;
