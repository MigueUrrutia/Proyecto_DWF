import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const TrackingScreen = () => {
  const [idPedido, setIdPedido] = useState('');
  const [estado, setEstado] = useState('');
  const [error, setError] = useState('');

  const consultarEstado = () => {
    axios.get(`${API_URL}/pedidos/${idPedido}`)
      .then(response => {
        setEstado(response.data.estado);
        setError('');
      })
      .catch(err => {
        setEstado('');
        setError('Pedido no encontrado o error en la consulta.');
        console.error(err);
      });
  };

  return (
    <div>
      <h1>Seguimiento de Pedido</h1>
      <input
        type="text"
        value={idPedido}
        onChange={(e) => setIdPedido(e.target.value)}
        placeholder="ID del Pedido"
      />
      <button onClick={consultarEstado}>Consultar</button>
      {estado && <p>Estado del pedido: {estado}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default TrackingScreen;
