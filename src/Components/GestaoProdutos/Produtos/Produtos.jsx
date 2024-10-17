import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { buscarProdutosNoBackend, buscarCategoriasNoBackend, atualizarProdutoNoBackend, buscarUnidadesMedidaNoBackend } from '../../../services';

import ProdutoInfoModal from './ProdutoInfoModal';
import styles from './Produtos.module.css';
import "bootstrap-icons/font/bootstrap-icons.css";

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState({});
  const [categoriasBackend, setCategoriasBackend] = useState([]);
  const [unidadesMedidasBackend, setUnidadesMedidasBackend] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState(null);

  const handleEdit = (id) => {
    const produto = produtos.find(produto => produto.id === id);
    setSelectedProduto(produto);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    console.log(`Excluir item ${id}`);
  };

  const handleCreate = () => {
    setSelectedProduto({
      nome: '',
      descricao: '',
      preco: 0,
      estoque: 0,
      idCategoria: '',
      idUnidade: '',
      status: true,
    });
    setShowModal(true);
  };


  const fetchProdutos = async () => {
    try {
      const data = await buscarProdutosNoBackend();
      setProdutos(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  const fetchCategorias = async () => {
    try {
      const data = await buscarCategoriasNoBackend();
      setCategoriasBackend(data);
      const categoriasMap = data.reduce((acc, categoria) => {
        acc[categoria.id] = categoria.nome;
        return acc;
      }, {});
      setCategorias(categoriasMap);
    } catch (error) {
      console.error("Erro ao buscar as categorias:", error);
    }
  };

  const fetchUnidadesMedida = async () => {
    try {
      const data = await buscarUnidadesMedidaNoBackend();
      setUnidadesMedidasBackend(data);
    } catch (error) {
      console.error("Erro ao buscar as unidades de medida:", error);
    }
  };

  const handleToggleStatus = (id) => {
    setProdutos((prevProdutos) =>
      prevProdutos.map((produto) =>
        produto.id === id ? { ...produto, status: produto.status ? false : true } : produto
      )
    );
  };

  const handleCloseModal = () => {
    setShowModal(false);
    fetchProdutos();
  };

  useEffect(() => {
    fetchProdutos();
    fetchCategorias();
    fetchUnidadesMedida();
  }, []);

  return (
    <div>
      <div className={styles.header}>
        <h2>Gestão de produtos</h2>
        <button className={styles.cadastrarButton} onClick={handleCreate}>
          Cadastrar
        </button>
      </div>
      <div className={styles.barraTitulo}>Lista de produtos</div>
      {produtos.length > 0 ? (
        <Table bordered hover className={styles.userTable}>
          <thead>
            <tr className={styles.tableHeader}>
              <th>Status</th>
              <th>Nome</th>
              <th className={styles.MobileOcult}>Categoria</th>
              <th className={styles.MobileOcult}>Estoque</th>
              <th className={styles.MobileOcult}>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id}>
                <td>
                  <Button
                    variant="light"
                    onClick={() => handleToggleStatus(produto.id)}
                    className={styles.statusToggle}
                  >
                    {produto.status ? (
                      <i className="bi bi-toggle-on" id={styles.ativo}></i>
                    ) : (
                      <i className="bi bi-toggle-off" id={styles.inativo}></i>
                    )}
                  </Button>
                </td>
                <td>{produto.nome}</td>
                <td className={styles.MobileOcult}>{categorias[produto.idCategoria] || 'Carregando...'}</td>
                <td className={styles.MobileOcult}>{produto.estoque}</td>
                <td className={styles.MobileOcult}>{produto.preco.toFixed(2)}</td>
                <td>
                  <Button
                    variant="light"
                    onClick={() => handleEdit(produto.id)}
                    className={styles.actionButton}
                  >
                    <i className="bi bi-info-square" id={styles.editIcon}></i>
                  </Button>
                  <Button
                    variant="light"
                    onClick={() => handleDelete(produto.id)}
                    className={styles.actionButton}
                  >
                    <i className="bi bi-trash" id={styles.deleteIcon}></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <div className={styles.msgVazia}>A lista de produtos está vazia.</div>
      )}

      {selectedProduto && (
        <ProdutoInfoModal
          show={showModal}
          handleClose={handleCloseModal}
          produto={selectedProduto}
          atualizarProduto={atualizarProdutoNoBackend}
          categorias={categoriasBackend}
          unidadesMedidas={unidadesMedidasBackend}
        />
      )}

    </div>
  );
};

export default Produtos;
