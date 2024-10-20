import axios from "axios";
import { criarProdutoPedidoNoBackend } from "./produto_pedido.service";

const capturaIdDoCarrinho = async () => {
    let idCarrinho = sessionStorage.getItem('idCarrinho') || null;
        
    if (!idCarrinho) {
        const userData = JSON.parse(localStorage.getItem("user"));
        idCarrinho = await buscarCarrinhoDeCompraPeloIdDoUsuarioNoBackend(userData.backendId);
        sessionStorage.setItem('idCarrinho', idCarrinho);
    }

    return idCarrinho;
}

const capturaIdDoUsuario = () => {
    const userData = JSON.parse(localStorage.getItem("user"));
    return userData.backendId;
}

export const criarCarrinhoDeCompraNoBackend = async (idUsuario) => {
    try {
        const data_atual = new Date().toISOString();
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}carrinho-compra`, {
            data: data_atual,
            status: true,
            idUsuario
        });

        return data;
    } catch (error) {
        console.error(error);
    }
}

export const buscarCarrinhoDeCompraPeloIdDoUsuarioNoBackend = async (idUsuario) => {
    try {
        let idCarrinho = sessionStorage.getItem('idCarrinho') || null;
        if (idCarrinho) return idCarrinho;

        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}carrinho-compra/buscar-por-id-usuario/${idUsuario}`);

        if (data.length === 0) {
            const novoCarrinho = await criarCarrinhoDeCompraNoBackend(idUsuario);
            sessionStorage.setItem('idCarrinho', novoCarrinho.id);
            return novoCarrinho.id;
        }

        return data.id;
    } catch (error) {
        console.error(error);
    }
}

export const adicionarProdutoNoCarrinho = async (quantidade, idProduto) => {
    try {
        let idCarrinho = await capturaIdDoCarrinho();
        const produto_pedido = await criarProdutoPedidoNoBackend(quantidade, idProduto);

        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}carrinho-compra/adicionar-no-carrinho`, {
            idCarrinhoCompra: idCarrinho,
            idProdutosPedido: produto_pedido.id
        });
        
        return {
            status: true,
            message: data.message
        };
    } catch (error) {
        return {
            status: false,
            message: "Erro ao adicionar produto no carrinho"
        };
    }
}

export const buscarItensDoCarrinhoPorUsuarioNoBackend = async () => {
    try {
        let idUsuario = capturaIdDoUsuario();
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}carrinho-compra/itens-carrinho-por-usuario/${idUsuario}`);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const removerProdutoDoCarrinhoNoBackend = async (idCarrinhoCompra, idProdutoPedido) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}carrinho-compra/remover-produto-carrinho`, {
            idCarrinhoCompra,
            idProdutoPedido
        });
          
        return {
            status: true,
            message: data.message
        };
    } catch (error) {
        return {
            status: false,
            message: "Erro ao remover produto do carrinho"
        };
    }
}