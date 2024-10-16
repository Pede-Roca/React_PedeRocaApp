import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from 'axios';
import "bootstrap-icons/font/bootstrap-icons.css";
import styles from './ProdutoInfoModal.module.css';

const ProdutoInfoModal = ({ show, handleClose, produto, onUpdateProduto }) => {
  const [nome, setNome] = useState(produto.nome);
  const [descricao, setDescricao] = useState(produto.descricao);
  const [preco, setPreco] = useState(produto.preco);
  const [estoque, setEstoque] = useState(produto.estoque);

  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  const handleSave = async () => {
    const updatedProduto = {
      ...produto,
      nome,
      descricao,
      preco,
      estoque,
    };

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}Produto/${produto.id}`, updatedProduto);
      console.log("Produto atualizado com sucesso!");

      onUpdateProduto(updatedProduto);

      setIsEditable(false);
    } catch (error) {
      console.error("Erro ao salvar as alterações do produto:", error);
    }
  };

  const handleCancel = () => {
    setNome(produto.nome);
    setDescricao(produto.descricao);
    setPreco(produto.preco);
    setEstoque(produto.estoque);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleCancel}>
      <Modal.Header closeButton>
        <Modal.Title><p className={styles.TituloDetalhes}>Detalhes do Produto</p></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.produtoInfo}>
        <label className={styles.label}>ID: 
            <input 
              type="text" 
              value={produto.id} 
              disabled 
              className={styles.inputField}
            />
          </label>
          <label className={styles.label}>Nome:
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className={styles.inputField}
            />
          </label>
          <br />
          <label className={styles.label}>Descrição:
            <input
              type="text"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className={styles.inputField}
            />
          </label>
          <br />
          <label className={styles.label}>Preço:
            <input
              type="number"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              className={styles.inputField}
            />
          </label>
          <br />
          <label className={styles.label}>Estoque:
            <input
              type="number"
              value={estoque}
              onChange={(e) => setEstoque(e.target.value)}
              className={styles.inputField}
            />
          </label>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCancel} className={styles.Voltar}>
          Cancelar
        </Button>
        <Button onClick={handleSave} className={styles.Salvar}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProdutoInfoModal;
