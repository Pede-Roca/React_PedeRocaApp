import React from 'react'
import { useState, useEffect } from 'react'
import styles from './PainelProdutos.module.css'

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import ProdutosTop10 from '../ProdutosTop10/ProdutosTop10.jsx';
import GestaoCategoria from '../Categorias/Categorias.jsx';
import Produtos from '../Produtos/Produtos.jsx';
import ItensForaEstoque from '../ItensForaEstoque/ItensForaEstoque.jsx';

import { numeroProdutosForaDeEstoque } from '../../../services/produto.service';


const PainelProtudos = () => {
  const [foraEstoque, setForaEstoque] = useState();
  const fetchItensForaEstoque = async () => {
    const data = await numeroProdutosForaDeEstoque();
    setForaEstoque(data);
  }

  useEffect(() => {
    fetchItensForaEstoque();
  }, []);

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
      <Tab 
          eventKey="Estoque" 
          title={
            <div>
              Estoque <span className={styles.OutOfStock}>{foraEstoque}</span>
            </div>
          }
        >
          <ItensForaEstoque />
        </Tab>
    </Tabs>
    </>
  )
}

export default PainelProtudos