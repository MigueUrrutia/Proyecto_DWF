import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../config';
import Header from './Header';

const CheckoutScreen = () => {
  const [pedido, setPedido] = useState({
    id_usuario: 1,
    metodo_pago: 'EFECTIVO',
    detalles: [
      { id_producto: 1, cantidad: 2 },
      { id_producto: 2, cantidad: 1 }
    ]
  });

  const [mensaje, setMensaje] = useState('');

  const enviarPedido = () => {
    axios.post(`${API_URL}/pedidos`, pedido)
      .then(response => {
        setMensaje('Pedido realizado con éxito. ID: ' + response.data.id_pedido);
      })
      .catch(error => {
        setMensaje('Error al realizar el pedido.');
        console.error(error);
      });
  };

  return (
    <div>
      <Header />
      <h1>Checkout</h1>
      <button onClick={enviarPedido}>Confirmar Pedido</button>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default CheckoutScreen;
