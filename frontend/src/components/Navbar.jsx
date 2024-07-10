import React from 'react';
import { NavLink } from 'react-router-dom';
import './../css/navbar.scss'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink 
            to="/dietas" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Lista de Dietas
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink 
            to="/agregar-dieta" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Agregar Dieta
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
