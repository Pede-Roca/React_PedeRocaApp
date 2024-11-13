import React, { useEffect, useState } from 'react';

const Aberto = ({ aberto }) => {
  const [nomeUsuario, setNomeUsuario] = useState('');
  const [usuarioFiltrado, setUsuarioFiltrado] = useState([]);

  useEffect(() => {
    setUsuarioFiltrado(
      aberto.filter(compra => 
        compra.usuario?.nome.toLowerCase().includes(nomeUsuario.toLowerCase())
      )
    );
  }, [nomeUsuario, aberto]);

  return (
    <>
      <h1>Pedidos em aberto</h1>
      <input
        type="text"
        placeholder="Buscar pelo nome do usuário"
        value={nomeUsuario}
        onChange={(e) => setNomeUsuario(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Nome do Usuário</th>
            <th>Itens do Carrinho</th>
            <th>Status do Pedido</th>
          </tr>
        </thead>
        <tbody>
          {usuarioFiltrado.length > 0 ? (
            usuarioFiltrado.map((compra, index) => (
              <tr key={index}>
                <td>{compra.usuario?.nome || 'Usuário não especificado'}</td>
                <td>
                  {compra.itensCarrinho.length > 0 ? (
                    <ul>
                      {compra.itensCarrinho.map((item, itemIndex) => (
                        <li key={itemIndex}>{item.nome || 'Item sem nome'}</li>
                      ))}
                    </ul>
                  ) : (
                    'Nenhum item no carrinho'
                  )}
                </td>
                <td>{compra.status ? 'Ativo' : 'Inativo'}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Nenhum pedido encontrado para o usuário informado</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Aberto;
