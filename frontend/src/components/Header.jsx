import React from 'react';
import logo from '../assets/logo.png';
import './../css/header.scss'; // Importa el archivo SCSS

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1 className="title">App de Dietas</h1>
      </div>
    </header>
  );
};

export default Header;
