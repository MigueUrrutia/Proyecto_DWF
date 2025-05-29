import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const HomeScreen = () => {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
  const token = localStorage.getItem('token');

  axios.get(`${API_URL}/productos`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => setProductos(res.data))
  .catch(err => console.error("Error al cargar productos:", err));
}, []);

  

  return (
    <div>
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
