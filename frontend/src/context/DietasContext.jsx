import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const DietasContext = createContext();

const DietasProvider = ({ children }) => {
  const [dietas, setDietas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDietas = async () => {
    try {
      const response = await axios.get('http://localhost:3000/dietas');
      setDietas(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error al cargar las dietas');
      setLoading(false);
    }
  };

  const createDieta = async (newDieta) => {
    try {
      const response = await axios.post('http://localhost:3000/dietas', newDieta);
      setDietas([...dietas, response.data]);
    } catch (error) {
      setError('Error al crear la dieta');
    }
  };

  const updateDieta = async (id, updatedDieta) => {
    try {
      const response = await axios.put(`http://localhost:3000/dietas/${id}`, updatedDieta);
      setDietas(dietas.map(dieta => (dieta._id === id ? response.data : dieta)));
    } catch (error) {
      setError('Error al actualizar la dieta');
    }
  };

  const deleteDieta = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/dietas/${id}`);
      setDietas(dietas.filter(dieta => dieta._id !== id));
    } catch (error) {
      setError('Error al eliminar la dieta');
    }
  };

  useEffect(() => {
    fetchDietas();
  }, []);

  return (
    <DietasContext.Provider value={{ dietas, loading, error, createDieta, updateDieta, deleteDieta }}>
      {children}
    </DietasContext.Provider>
  );
};

export { DietasProvider, DietasContext };
