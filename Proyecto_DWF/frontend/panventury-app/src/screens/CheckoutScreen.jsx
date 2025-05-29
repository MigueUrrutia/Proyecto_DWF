import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';

const CheckoutScreen = () => {
  const [pedido, setPedido] = useState({
    nombreCliente: 'Cliente',
    estado: 'PENDIENTE',
    detalles: [
      { producto: { id: 1 }, cantidad: 2 },
      { producto: { id: 2 }, cantidad: 1 }
    ]
  });

  const [mensaje, setMensaje] = useState('');

 const enviarPedido = () => {
  const token = localStorage.getItem('token');

  axios.post(`${API_URL}/pedidos`, pedido, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      const pedidoCreado = response.data;
      if (pedidoCreado?.id) {
        setMensaje('Pedido realizado con éxito. ID: ' + pedidoCreado.id);
      } else {
        setMensaje('Pedido realizado, pero no se pudo obtener el ID.');
      }
    })
    .catch(error => {
      console.error("Error al crear pedido:", error);
      setMensaje('Error al realizar el pedido.');
    });
};


  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={enviarPedido}>Confirmar Pedido</button>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default CheckoutScreen;