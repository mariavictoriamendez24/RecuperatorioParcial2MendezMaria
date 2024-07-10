import './../css/dietas.scss';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { DietasContext } from './../context/DietasContext';
import AgregarDieta from './AgregarDieta';

const DietasList = () => {
  const { dietas, loading, error, deleteDieta } = useContext(DietasContext);

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="dietas-list-container">
      <h2>Lista de Dietas</h2>
      {dietas.length === 0 ? (
        <p>No hay dietas disponibles.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Título</th>
              <th>Ingredientes</th>
              <th>Descripción</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {dietas.map(dieta => (
              <tr key={dieta._id}>
                <td>{dieta.titulo}</td>
                <td>{dieta.ingredientes}</td>
                <td>{dieta.descripcion}</td>
                <td>
                  <button className="button white">
                    <Link to={`/editar-dieta/${dieta._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>editar</Link>
                  </button>
                </td>
                <td>
                  <button onClick={() => deleteDieta(dieta._id)} className="button is-danger">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {error && <p className="error-message">{error}</p>}
      
      <AgregarDieta />
    </div>
  );
};

export default DietasList;
