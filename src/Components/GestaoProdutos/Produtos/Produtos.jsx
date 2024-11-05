import React, { useState, useEffect } from "react";
import { Table, Button, Toast } from "react-bootstrap";
import { buscarProdutosNoBackend, buscarCategoriasNoBackend, atualizarProdutoNoBackend, buscarUnidadesMedidaNoBackend, alterarStatusProduto } from '../../../services';
import ProdutoInfoModal from './ProdutoInfoModal';
import styles from './Produtos.module.css';
import "bootstrap-icons/font/bootstrap-icons.css";

const Produtos = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState("green");

  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState({});
  const [categoriasBackend, setCategoriasBackend] = useState([]);
  const [unidadesMedidasBackend, setUnidadesMedidasBackend] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); 

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

  const handleEdit = (id) => {
    const produto = produtos.find((produto) => produto.id === id);
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

  const handleToggleStatus = async (id) => {
    const produto = produtos.find((produto) => produto.id === id);
    const novoStatus = !produto.status;
  
    try {
      const response = await alterarStatusProduto(id, novoStatus);
      if (response) {
        setProdutos((prevProdutos) =>
          prevProdutos.map((p) =>
            p.id === id ? { ...p, status: novoStatus } : p
          )
        );
        handleShowToast("Status do produto atualizado!", "#7C8C03");
      }
    } catch (error) {
      console.error("Erro ao alterar o status do produto:", error);
      handleShowToast("Erro ao alterar o status do produto.", "#A60303");
    }
  };

  const handleCloseModal = (produtoReturn) => {
    console.log(produtoReturn);
    if (!produtoReturn) return setShowModal(false);
    const { produto, tipo } = produtoReturn;
    if (tipo === 'create') {
      setShowModal(false);
      setProdutos((prevProdutos) => [...prevProdutos, produto]);
      handleShowToast("Produto criado com sucesso!", "#28a745");
    } else if (tipo === 'update') {
      setShowModal(false);
      setProdutos((prevProdutos) => prevProdutos.map((p) => p.id === produto.id ? produto : p));
      handleShowToast("Produto atualizado com sucesso!", "#28a745");
    }
    fetchProdutos();
    fetchCategorias();
    fetchUnidadesMedida();
  };

  const handleShowToast = (message, color) => {
    setToastMessage(message);
    setToastColor(color);
    setShowToast(true);
  };

  useEffect(() => {
    fetchProdutos();
    fetchCategorias();
    fetchUnidadesMedida();
  }, []);

  const filteredProdutos = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (categorias[produto.idCategoria] && categorias[produto.idCategoria].toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const exportToCSV = () => {
    const csvData = [
      ["id","Status", "Nome", "Categoria", "Estoque", "Preço"],
      ...filteredProdutos.map(produto => [
        produto.id,
        produto.status ? "Ativo" : "Inativo",
        produto.nome,
        categorias[produto.idCategoria] || 'Carregando...',
        produto.estoque,
        produto.preco.toFixed(2)
      ])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvData.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "produtos.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className={styles.header}>
        <h2>Gestão de produtos</h2>
        <button className={styles.exportButton} onClick={exportToCSV}>
          <i class="bi bi-filetype-csv"></i>
        </button>
        <button className={styles.cadastrarButton} onClick={handleCreate}>
          Cadastrar
        </button>
      </div>
  
      <div className={styles.barraTitulo}>Lista de produtos</div>

      <span
        className="navbar navbar-expand-xxxl sticky-top d-flex justify-content-center align-items-baseline"
        id={styles.filtroPesquisa1}
      >
        <form className="d-flex" id={styles.TamanhoFormPesquisa} onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            onChange={(event) => setSearchTerm(event.target.value)}
            value={searchTerm}
            className="form-control flex-grow-1"
            placeholder="Busque por Nome/Categoria"
            aria-label="Search"
            id={styles.filtroPesquisa}
          />
        </form>
      </span>
   
      {filteredProdutos.length > 0 ? (
        <div className={styles.scrollContainer}>
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
              {filteredProdutos.map((produto) => (
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
                  <td className={styles.MobileOcult}>
                    {categorias[produto.idCategoria] || 'Carregando...'}
                  </td>
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
        </div>
      ) : (
        <div className={styles.msgVazia}>Nenhum produto encontrado.</div>
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

      {/* Toast para exibir mensagem de sucesso/erro */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 1050,
          backgroundColor: "#7C8C03",
          color: "white",
          fontSize: "1rem",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default Produtos;