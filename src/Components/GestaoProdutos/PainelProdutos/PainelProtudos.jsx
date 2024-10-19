import React from 'react'
import styles from './PainelProdutos.module.css'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import ProdutosTop10 from '../ProdutosTop10/ProdutosTop10.jsx';
import GestaoCategoria from '../Categorias/Categorias.jsx';
import Produtos from '../Produtos/Produtos.jsx';


const PainelProtudos = () => {

  return (
    <>
    <Tabs
      defaultActiveKey="Produtos"
      id="fill-tab-example"
      className={styles.tabs}
      fill
    >
      <Tab eventKey="Produtos" title="Produtos">
        <Produtos />
      </Tab>
      <Tab eventKey="Categorias" title="Categorias">
        <GestaoCategoria />
      </Tab>
      <Tab eventKey="Top 10" title="Top 10">
        <ProdutosTop10 />
      </Tab>
      <Tab eventKey="Estoque" title="Estoque">
         <h1>Colocar componente de lista de stock</h1>
      </Tab>
    </Tabs>
    </>
  )
}

export default PainelProtudos