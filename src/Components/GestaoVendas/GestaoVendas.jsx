import React from 'react'
import styles from './GestaoVendas.module.css'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const GestaoVendas = () => {
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
      </Tab>
      <Tab eventKey="Aberto" title="Aberto">
        <h1>Colocar componente de lista de Acompanhamento de Vendas</h1>
      </Tab>
      <Tab eventKey="Entrega" title="Entregas">
        <h1>A definir</h1>
      </Tab>
      <Tab eventKey="Finalizadas" title="Finalizadas">
         <h1>A definir</h1>
      </Tab>
    </Tabs>
    </>
  )
}

export default GestaoVendas