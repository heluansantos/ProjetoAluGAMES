import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import "./styles.css";

import api from "../../services/api";

import logoUm from "../../assets/logo-um.png";
import logoCenter from "../../assets/logo-center.png"
export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const chkCar = document.getElementById("chkCar");
    if (!chkCar.checked) {
      alert("É obrigatório ler e aceitar os termos de uso para poder criar uma conta!");
    }
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    if (name && email && whatsapp && city && uf && chkCar.checked) {
      try {
        const response = await api.post("/ongs", data);

        alert(`Seu ID de acesso: ${response.data.id}`);

        history.push("/");
      } catch (err) {
        console.log(err);
        alert("Erro no cadastro, tente novamente");
      }
    } else {
      alert("Preencha todos os campus e leia e aceite os termos de uso!");
    }
  }

  return (

    <div className="register-container">
      <div className="flex">
        <img src={logoUm} alt="Imagem de logo" s />
        
      </div>
      <form onSubmit={handleRegister}>
        <div className="logo-center">
          <img src={logoCenter} alt="logo" height="25" />
        </div>
        <div className="input-top">
          <input
            placeholder="Nome"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            className="input-left"
            placeholder="Cidade"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <input
            className="input-right"
            placeholder="UF"
            style={{ width: 80 }}
            value={uf}
            onChange={e => setUf(e.target.value)}
          />
        </div>
        <div className="contract">
          <input type="checkbox" id="chkCar" name="scales" />
          <p>Declaro ter lido e aceito o</p> <Link to="/aboutuser" target="_blank">Termo de compromisso </Link>
        </div>
        <button className="button" id="btn-cad" type="submit">
          <strong>CADASTRAR</strong>
          <img src="https://img.icons8.com/material-rounded/24/000000/forward.png" />
        </button>
        <div className="aviso">
          <p>Você receberá um ID referente ao seu login, NÃO O PERCA.</p>
        </div>
      </form>
    </div>
  );
}
