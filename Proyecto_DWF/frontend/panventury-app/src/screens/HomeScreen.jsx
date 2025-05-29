import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import Header from './Header';

const HomeScreen = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/productos`)
      .then(response => {
        setProductos(response.data);
      })
      .catch(err => {
        setError('No se pudieron cargar los productos.');
        console.error(err);
      });
  }, []);

  

  return (
    <div>
      <Header />
      <h1>Catálogo de Productos</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {productos.map(producto => (
          <li key={producto.id_producto}>
            <strong>{producto.nombre}</strong> - ${producto.precio}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeScreen;
