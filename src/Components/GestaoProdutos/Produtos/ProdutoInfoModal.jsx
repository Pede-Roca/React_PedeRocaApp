import React, { useState, useEffect } from "react";
import { Modal, Button, Offcanvas } from "react-bootstrap";
import { atualizarProdutoNoBackend, criarProdutoNoBackend } from '../../../services';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import styles from './ProdutoInfoModal.module.css';
import "bootstrap-icons/font/bootstrap-icons.css";


const ProdutoInfoModal = ({ show, handleClose, produto, categorias, unidadesMedidas }) => {
  const [nome, setNome] = useState(produto?.nome || '');
  const [descricao, setDescricao] = useState(produto?.descricao || '');
  const [preco, setPreco] = useState(produto?.preco || 0);
  const [estoque, setEstoque] = useState(produto?.estoque || 0);
  const [idCategoria, setIdCategoria] = useState(produto?.idCategoria || '');
  const [idUnidade, setIdUnidade] = useState(produto?.idUnidade || '');
  const [uidFoto, setUidFoto] = useState(produto?.uidFoto || ''); 


  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const storage = getStorage();

  useEffect(() => {
    if (produto) {
      setNome(produto.nome || '');
      setDescricao(produto.descricao || '');
      setPreco(produto.preco || 0);
      setEstoque(produto.estoque || 0);
      setIdCategoria(produto.idCategoria || '');
      setIdUnidade(produto.idUnidade || '');
      setUidFoto(produto.uidFoto || '');  // Corrigido aqui para setImageUrl
    }
  }, [produto]);

  const handleSave = async () => {
    const produtoAtualizado = {
      ...produto,
      nome,
      descricao,
      preco,
      estoque,
      idCategoria,
      idUnidade,
      uidFoto: imageUrl,
    };

    try {
      if (produto.id) {
        const data = await atualizarProdutoNoBackend(produto.id, produtoAtualizado);
        if (!data) {
          alert("Erro ao atualizar o produto");
          return console.error("Erro ao atualizar o produto");
        }
        alert("Produto atualizado com sucesso!");
      } else {
        const data = await criarProdutoNoBackend(produtoAtualizado);
        if (!data) {
          alert("Erro ao criar o produto");
          return console.error("Erro ao criar o produto");
        }
        alert("Produto criado com sucesso!");
      }

      handleClose();
    } catch (error) {
      console.error("Erro ao salvar as alterações do produto:", error);
    }
  };

  const handleCancel = () => {
    handleClose();
  };

  const HandleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    const storageRef = ref(storage, `Produtos/${image.name}`);
    uploadBytes(storageRef, image).then((snapshot) => {
      console.log("imagem upload");
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
      });
    });
  };


  return (
    <Modal show={show} onHide={handleCancel} size="lg">
      <Modal.Header closeButton>
        <Modal.Title><p className={styles.TituloDetalhes}>Detalhes do Produto</p></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.produtoInfo}>
          <div className={styles.ContainerImagemProduto}>
            <img className={styles.imgProduto} src={imageUrl || produto.uidFoto} alt="Imagem do produto" />
            <label className={styles.label}>
              <input
                type="file"
                accept="image/*"
                onChange={HandleFileChange}
                className={styles.inputField}
              />
                <button className={styles.btnTrocarFoto} onClick={handleSubmit}>
                  <i className="bi bi-pencil"></i>
                  </button>
            </label>
          </div>
          <div className={styles.containerDescricao}>
            <label className={styles.label}>Nome:
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={styles.inputField}
              />
            </label>
            <label className={styles.label}>Descrição:
              <input
                type="text"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className={styles.inputField}
              />
            </label>
            <label className={styles.label}>Preço:
              <input
                type="number"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                className={styles.inputField}
              />
            </label>
            <label className={styles.label}>Estoque:
              <input
                type="number"
                value={estoque}
                onChange={(e) => setEstoque(e.target.value)}
                className={styles.inputField}
              />
            </label>
            <label className={styles.label}>Categoria:
              <select
                value={idCategoria}
                onChange={(e) => setIdCategoria(e.target.value)}
                className={styles.inputField}
              >
                <option value="" disabled>Selecione uma categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
            </label>
            <label className={styles.label}>Unidade de Medida:
              <select
                value={idUnidade}
                onChange={(e) => setIdUnidade(e.target.value)}
                className={styles.inputField}
              >
                <option value="" disabled>Selecione uma unidade</option>
                {unidadesMedidas.map((unidade) => (
                  <option key={unidade.id} value={unidade.id}>
                    {unidade.nomeUnidade}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCancel} className={styles.Voltar}>
          Cancelar
        </Button>
        <Button onClick={handleSave} className={styles.Editar}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProdutoInfoModal;
