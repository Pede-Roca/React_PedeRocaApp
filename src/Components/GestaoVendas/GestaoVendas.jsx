import React, { useEffect, useState } from 'react';
import styles from './GestaoVendas.module.css';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { buscarComprasFinalizadasNoBackend, buscarComprasFinalizadaParaTodosOsPedidosNoBackend } from '../../services';

const GestaoVendas = () => {
  const [todosPedidos, setTodosPedidos] = useState([]);
  const [entregas, setEntregas] = useState([]);
  const [finalizadas, setFinalizadas] = useState([]);
  const [aberto, setAberto] = useState([]);

  const fetchCompraFinalizadaTodosOsPedidos = async () => {
    try {
      const data = await buscarComprasFinalizadaParaTodosOsPedidosNoBackend();
      setTodosPedidos(data);
    } catch (error) {
      console.error("Erro ao buscar os dados:", error)
    }
  }

  const fetchComprasFinalizadas = async () => {
    try {
      const { entregasPendentes, comprasFinalizadas, comprasEmAberto } = await buscarComprasFinalizadasNoBackend();
      
      setEntregas(entregasPendentes);
      setFinalizadas(comprasFinalizadas);
      setAberto(comprasEmAberto);

    } catch (error) {
      console.error("Erro ao buscar os dados:", error);
    }
  };

  useEffect(() => {
    fetchComprasFinalizadas();
    fetchCompraFinalizadaTodosOsPedidos();
  }, []);

  return (
    <>
      <Tabs
        defaultActiveKey="Pedidos"
        id="fill-tab-example"
        className={styles.tabs}
        fill
      >
        <Tab eventKey="Pedidos" title="Pedidos">
          <h1>Colocar componente de lista de Pedidos</h1>
          <ul>
            {todosPedidos.map((compra, index) => (
              <li key={index}>{compra.status}</li>
            ))}
          </ul>
        </Tab>
        <Tab eventKey="Aberto" title="Aberto">
          <h1>Colocar componente de lista de Acompanhamento de Vendas</h1>
          <ul>
            {aberto.map((compra, index) => (
              <li key={index}>{compra.data}</li>
            ))}
          </ul>
        </Tab>
        <Tab eventKey="Entrega" title="Entregas">
          <h1>Falta entregar</h1>
          <ul>
            {entregas.map((compra, index) => (
              <li key={index}>{compra.data}</li>
            ))}
          </ul>
        </Tab>
        <Tab eventKey="Finalizadas" title="Finalizadas">
          <h1>A definir</h1>
          <ul>
            {finalizadas.map((compra, index) => (
              <li key={index}>{compra.data}</li>
            ))}
          </ul>
        </Tab>
      </Tabs>
    </>
  );
}

export default GestaoVendas;
