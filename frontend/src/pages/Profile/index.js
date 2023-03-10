import React, { useState, useEffect } from "react";
import logoImg from "../../assets/logo-um.png";
import jogoImg from "../../assets/jogo.png";
import socialIco from "../../assets/whatsapp.png"
import { Link, useHistory } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";
import api from "../../services/api";
import "./styles.css";
//43b30896
//ed07d990
//71311a5a - esse funciona

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const [xincidents, setXincidents] = useState([]);
  const ongName = localStorage.getItem("ongName");
  const ongId = localStorage.getItem("ongId");

  const history = useHistory();

  useEffect(() => {
    api
      .get("/profile", {
        headers: { Authorization: ongId }
      })
      .then(response => {
        setIncidents(response.data);
      });
  }, [ongId]);


  useEffect(() => {
    api.get("incidents", {
      headers: { Authorization: ongId }
    })
      .then(response => {
        setXincidents(response.data);
      });
  }, []);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId
        }
      });

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert("Erro ao deletar o caso");
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }
  return (
    <div className="profile-container">
      <header>
        <div>
          <img src={logoImg} alt="AluGAMES" />
          <div className="wellcome">
            <p >Seja bem vindo(a),</p>
            <p className="name-user">
                {ongName}!
            </p>
          </div>
          
          
        </div>
        
        <Link to="/incidents/new" className="register" id="btn-cad"> 
          Cadastrar novo jogo
        </Link>
        <div>
          <Link to="/" className="back">sair
          </Link>
        </div>

      </header>
      <div className="scroll-horizontal">
        <h2 className="title-jogos">MEUS JOGOS</h2>
        <ul className="lista1">
          {incidents.map(incident => (
            <li key={incident.id}>
              <div className="exibe1">
                <div className="img-jogo1">
                  <img src={jogoImg} alt="AluGAMES" />
                </div>
                <div>
                  <button className="trash" type="button" onClick={() => handleDeleteIncident(incident.id)}>
                    <FiTrash2 size={20} color="#a8a8b3" />
                  </button>
                </div>
              </div>
              <div className="info-esq">
                <p className="nome">{incident.title}</p>
                <p className="descricao">{incident.description}</p>
              </div>
              
            </li>
          ))}
        </ul>
        <h2 className="title-jogos"> JOGOS DISPON??VEIS PARA EMPR??STIMO </h2>
        <p className="aviso">Voc?? entrar?? em contato com o propriet??rio do jogo</p>
        <ul className="lista2">
          {xincidents.map(incidentx => (
            <li key={incidentx.id}>
              
              <p className="user-name">{incidentx.name}</p>
              <div className="info-esq2">
                
                <p className="nome">{incidentx.title}</p>
                <p className="descricao">{incidentx.description}</p>
              </div>
              <div className="img-jogo2">
                <img src={jogoImg} alt="AluGAMES" />
              </div>
              <div className="info-dir">
                <a href={`https://api.whatsapp.com/send?phone=${encodeURIComponent(incidentx.name)}&text=${encodeURIComponent(`Estou interessado em pegar emprestado com voc?? o jogo de ${incidentx.title}, pode ser ? `)}`} target="_blank">
                  <button >  quero esse <img src={socialIco} /></button>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
      
    </div>
  );
}
