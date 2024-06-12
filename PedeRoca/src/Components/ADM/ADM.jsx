import React, { useState, useEffect } from "react";
import styles from "./ADM.module.css";
import { Accordion, Modal, Button } from "react-bootstrap";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const ADM = () => {
  const db = getFirestore();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const dataUser = await getDocs(collection(db, "tb_usuarios"));
      setUsers(dataUser.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchUsers();
  }, [db]);

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "tb_usuarios", id));
    setUsers(users.filter((u) => u.id !== id));
  };

  const [produtos, setProdutos] = useState([]);
  const produtosCollectionRef = collection(db, "tb_produtos");

  useEffect(() => {
    const fetchProdutos = async () => {
      const data = await getDocs(produtosCollectionRef);
      setProdutos(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchProdutos();
  }, [db]);

  const toggleProdutoAtivo = async (id) => {
    const produtoRef = doc(db, "tb_produtos", id);
    const produtoSnap = await getDoc(produtoRef);
    const produtoData = produtoSnap.data();

    if (produtoData) {
      const novoEstado = !produtoData.ativo;
      await updateDoc(produtoRef, {
        ativo: novoEstado,
      });
      setProdutos(
        produtos.map((produto) =>
          produto.id === id ? { ...produto, ativo: !produto.ativo } : produto
        )
      );
    }
  };

  const [filtro, setFiltro] = useState("");
  const filterProdutos = produtos
    .filter((produto) =>
      produto.nome.toLowerCase().includes(filtro.toLowerCase())
    )
    .map((produto) => ({
      ...produto,
      ativo: produto.ativo,
      qtd_estoque: produto.qtd_estoque,
    }));

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        ADM
      </Button>

      <Modal show={show} onHide={handleClose} fullscreen>
        <Modal.Header closeButton>
          <Modal.Title>Gerenciamento do Site</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Gestão de usuários</Accordion.Header>
              <Accordion.Body>
                <table>
                  <thead>
                    <tr>
                      <th>Excluir</th>
                      <th>Nome</th>
                      <th>Email</th>
                      <th>Nivel de Acesso</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <button
                            onClick={() => deleteUser(user.id)}
                            className={styles.btnTrash}
                          >
                            <i class="bi bi-trash"></i>
                          </button>
                        </td>
                        <td>{user.nome}</td>
                        <td>{user.email}</td>
                        <td>{user.nivel_acesso}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Gerenciar Produtos</Accordion.Header>
              <Accordion.Body>
                <input
                  type="text"
                  value={filtro}
                  onChange={(e) => setFiltro(e.target.value)}
                  placeholder="Pesquisar produtos"
                  className={styles.inputSearch}
                />
                <table>
                  <thead>
                    <tr>
                      <th>Desativar</th>
                      <th>Ativo?</th>
                      <th>Nome</th>
                      <th>Qtd Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterProdutos.map((produto) => (
                      <tr key={produto.id}>
                        <td>
                          <button
                            onClick={() => toggleProdutoAtivo(produto.id)}
                            className={styles.btnStatus}
                          >
                            {produto.ativo && <i class="bi bi-toggle-on"></i>}
                            {!produto.ativo && <i class="bi bi-toggle-off"></i>}
                          </button>
                        </td>
                        <td>
                          {produto.ativo == true && "Sim"}
                          {produto.ativo == false && "Não"}
                        </td>
                        <td>{produto.nome}</td>
                        <td>{produto.qtd_estoque}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ADM;
