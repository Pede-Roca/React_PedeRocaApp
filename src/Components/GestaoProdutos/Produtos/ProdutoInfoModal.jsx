import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { atualizarProdutoNoBackend, criarProdutoNoBackend, buscarProdutoPorIdNoBackend } from '../../../services';
import { produtoImage } from "../../../hooks/ImgUploadHook";
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
  const [previewImage, setPreviewImage] = useState(produto?.uidFoto || '');
  const [hasTempUrl, setHasTempUrl] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (produto) {
      setNome(produto.nome || '');
      setDescricao(produto.descricao || '');
      setPreco(produto.preco || 0);
      setEstoque(produto.estoque || 0);
      setIdCategoria(produto.idCategoria || '');
      setIdUnidade(produto.idUnidade || '');
      setUidFoto(produto.uidFoto || '');
      setPreviewImage(produto.uidFoto || '');
    }
  }, [produto]);

    const handleSave = async () => {
    const produtoAtualizado = {
      ...produto,
      nome,
      descricao,
      preco: Number(preco),
      estoque: Number(estoque),
      idCategoria,
      idUnidade,
      uidFoto: uidFoto || '',
    };

    try {
      const isUpdating = Boolean(produto.id);

      const handleImageUpload = async (produtoId) => {
        if (hasTempUrl && selectedImage) {
          const downloadURL = await produtoImage(selectedImage, produtoId);
          if (downloadURL) produtoAtualizado.uidFoto = downloadURL;
        }
      };

      if (isUpdating) {
        if(produto.uidFoto === '') await handleImageUpload(produto.id);

        const data = await atualizarProdutoNoBackend(produto.id, produtoAtualizado);
        if (!data) {
          console.error("Erro ao atualizar o produto");
          return;
        }

        setHasTempUrl(false);
        setSelectedImage(null);
        return handleClose({ produto: produtoAtualizado, tipo: 'update' });

      } else {
        let data = await criarProdutoNoBackend(produtoAtualizado);
        if (!data) {
          console.error("Erro ao criar o produto");
          return;
        }

        await handleImageUpload(data.id);

        const produtoCriado = await buscarProdutoPorIdNoBackend(data.id);
        if (!produtoCriado) {
          console.error("Erro ao buscar o produto criado");
          return;
        }

        return handleClose({ produto: produtoCriado, tipo: 'create' });
      }
    } catch (error) {
      console.error("Erro ao salvar as alterações do produto:", error);
    }
  };

  const handleCancel = () => {
    handleClose();
  };

  const HandleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const tempUrl = URL.createObjectURL(file);
      setHasTempUrl(true);
      setPreviewImage(tempUrl);
    }
  };

  return (
    <Modal show={show} onHide={handleCancel} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>
          <p className={styles.TituloDetalhes}>Detalhes do Produto</p>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={styles.produtoInfo}>
          <div className={styles.ContainerImagemProduto}>
            <img className={styles.imgProduto} src={previewImage || produto.uidFoto} alt="Imagem do produto" />
            <label className={styles.label}>
              <input
                type="file"
                accept="image/*"
                onChange={HandleFileChange}
              />
              <p className={styles.btnAlterarFoto}><i className="bi bi-pencil"></i> Alterar Foto</p>
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
        <div className={styles.containerTexto}>
            <label className={styles.label}>Descrição:
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className={styles.inputFieldDescricao}
            />
              </label>
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
