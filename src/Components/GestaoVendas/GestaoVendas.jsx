import React, { useEffect, useState } from 'react';
import styles from './GestaoVendas.module.css';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { buscarComprasFinalizadasNoBackend, buscarComprasFinalizadaParaTodosOsPedidosNoBackend } from '../../services';
import Pedidos from './Pedidos/Pedidos';
import Aberto from './Aberto/Aberto';
import Entrega from './Entrega/Entrega';
import Finalizada from './Finalizada/Finalizada';

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
          <Pedidos todosPedidos={todosPedidos} />
        </Tab>
        <Tab eventKey="Aberto" title="Aberto">
          <Aberto aberto={aberto} />
        </Tab>
        <Tab eventKey="Entrega" title="Entregas">
          <Entrega  entregas={entregas} />
        </Tab>
        <Tab eventKey="Finalizadas" title="Finalizadas">
          <Finalizada finalizadas={finalizadas} />
        </Tab>
      </Tabs>
    </>
  );
}

export default GestaoVendas;
