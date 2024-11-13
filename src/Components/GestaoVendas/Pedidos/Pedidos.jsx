import React from 'react';

const Pedidos = ({ todosPedidos }) => {
  return (
    <>
      <h1>Todos os Pedidos</h1>
      <ul>
        {todosPedidos.map((compra, index) => (
          <li key={index}>{compra.status}</li>
        ))}
      </ul>
    </>
  );
};

export default Pedidos;
