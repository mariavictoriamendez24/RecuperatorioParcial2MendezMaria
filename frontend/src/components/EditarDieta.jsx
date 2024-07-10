import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditarDieta = () => {
  const { id } = useParams(); // Cambia 'titulo' a 'id'
  const navigate = useNavigate();
  const [dieta, setDieta] = useState({ titulo: '', ingredientes: '', descripcion: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchDieta = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/dietas/${id}`); // Cambia 'titulo' a 'id'
        setDieta(response.data); // Asigna los datos de la dieta a 'dieta'
        setLoading(false);
      } catch (error) {
        setError('Error al cargar la dieta');
        setLoading(false);
      }
    };

    fetchDieta();
  }, [id]); // Cambia 'titulo' a 'id'

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/dietas/${id}`, { // Cambia 'titulo' a 'id'
        titulo: dieta.titulo,
        ingredientes: dieta.ingredientes,
        descripcion: dieta.descripcion
      });
      setSuccess('Dieta actualizada con éxito');
      setTimeout(() => {
        navigate('/dietas'); // Redirige a la lista de dietas después de 2 segundos
      }, 2000);
    } catch (error) {
      setError('Error al actualizar la dieta');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDieta(prevDieta => ({
      ...prevDieta,
      [name]: value
    }));
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="form-container">
      <h2>Editar Dieta</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            name="titulo"
            value={dieta.titulo}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Ingredientes :
          <input
            type="text"
            name="ingredientes"
            value={dieta.ingredientes}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Descripción:
          <textarea
            name="descripcion"
            value={dieta.descripcion}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <button type="submit">Actualizar Dieta</button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default EditarDieta;
