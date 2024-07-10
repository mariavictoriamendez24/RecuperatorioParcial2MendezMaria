
import './../css/form.scss';import React, { useState, useContext } from 'react';
import { DietasContext } from './../context/DietasContext'; // Ajusta la ruta según tu estructura de archivos

const AgregarDieta = () => {
  const { createDieta } = useContext(DietasContext);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [ingredientes, setIngredientes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createDieta({ titulo, descripcion, ingredientes });
    setTitulo('');
    setDescripcion('');
    setIngredientes('');
  };

  return (




<div className="form-container">
    
    <form onSubmit={handleSubmit}>
      <div>
        <label>Título:</label> 
        <br />
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      </div>
      <div>
        <label>Descripción:</label>
        <br />
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
      </div>
      <div>
        <label>Ingredientes:</label>
        <br />
        <input type="text" value={ingredientes} onChange={(e) => setIngredientes(e.target.value)} />
      </div>
      <button type="submit">Agregar Dieta</button>
    </form>
    </div>
  );
};

export default AgregarDieta;
