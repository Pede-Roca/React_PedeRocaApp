import axios from "axios";
import { criarProdutoPedidoNoBackend, capturarIdDoUsuarioESetarNoLocalStorage } from "../services";

// Função auxiliar para lidar com requisições HTTP
const realizarRequisicao = async (metodo, url, dados = {}) => {
    try {
        const response = await axios[metodo](url, dados);
        return { data: response.data, erro: null };
    } catch (error) {
        console.error(`Erro ao realizar requisição: ${error}`);
        return { data: null, erro: error };
    }
};

// Captura ou cria o ID do carrinho de compra
const capturaIdDoCarrinho = async () => {
    const backendId = await capturarIdDoUsuarioESetarNoLocalStorage();
    const carrinhoExistente = await buscarCarrinhoDeCompraPeloIdDoUsuarioNoBackend(backendId);

    if (!carrinhoExistente) {
        const novoCarrinho = await criarCarrinhoDeCompraNoBackend(backendId);
        return novoCarrinho || null;
    }

    return carrinhoExistente;
};

// Cria um novo carrinho de compra no backend
export const criarCarrinhoDeCompraNoBackend = async (idUsuario) => {
    const { data, erro } = await realizarRequisicao("post", `${import.meta.env.VITE_API_URL}carrinho-compra`, { idUsuario });
    return erro ? null : data.id;
};

// Busca o carrinho de compra pelo ID do usuário no backend
export const buscarCarrinhoDeCompraPeloIdDoUsuarioNoBackend = async (idUsuario) => {
    const { data, erro } = await realizarRequisicao("get", `${import.meta.env.VITE_API_URL}carrinho-compra/buscar-por-id-usuario/${idUsuario}`);
    return erro ? null : data.id;
};


// Adiciona um produto ao carrinho de compra
export const adicionarProdutoNoCarrinho = async (quantidade, idProduto) => {
    try {
        const idCarrinho = await capturaIdDoCarrinho();
        if (!idCarrinho) throw new Error("Erro ao obter o ID do carrinho");

        const produtoPedido = await criarProdutoPedidoNoBackend(quantidade, idProduto);
        const { data } = await realizarRequisicao("post", `${import.meta.env.VITE_API_URL}carrinho-compra/adicionar-no-carrinho`, {
            idCarrinhoCompra: idCarrinho,
            idProdutosPedido: produtoPedido.id
        });

        return { status: true, message: data.message };
    } catch (error) {
        return { status: false, message: "Erro ao adicionar produto no carrinho" };
    }
};

// Busca os itens do carrinho de compra pelo ID do usuário no backend
export const buscarItensDoCarrinhoPorUsuarioNoBackend = async () => {
    try {
        const idCarrinhoCompra = await capturaIdDoCarrinho();
        if (!idCarrinhoCompra) throw new Error("Erro ao obter o ID do carrinho");

        const idUsuario = await capturarIdDoUsuarioESetarNoLocalStorage();
        const { data } = await realizarRequisicao("get", `${import.meta.env.VITE_API_URL}carrinho-compra/itens-carrinho-por-usuario`, {
            params: {
                idUsuario,
                idCarrinhoCompra
            }
        });

        return data || [];
    } catch (error) {
        return { status: false, message: "Erro ao buscar itens do carrinho" };
    }
};

// Remove um produto do carrinho de compra no backend
export const removerProdutoDoCarrinhoNoBackend = async (idCarrinhoCompra, idProdutoPedido) => {
    const { data, erro } = await realizarRequisicao("post", `${import.meta.env.VITE_API_URL}carrinho-compra/remover-produto-carrinho`, {
        idCarrinhoCompra,
        idProdutoPedido
    });

    return erro
        ? { status: false, message: "Erro ao remover produto do carrinho" }
        : { status: true, message: data.message };
};

export const finalizarCompraNoBackend = async () => {
    try {
        const idCarrinhoCompra = await capturaIdDoCarrinho();
        const { data } = await realizarRequisicao("post", `${import.meta.env.VITE_API_URL}carrinho-compra/finalizar-compra/${idCarrinhoCompra}`)
        console.log(data);
        return { status: true, message: data.message };
    } catch (error) {
        return { status: false, message: "Erro ao finalizar a compra" };
    }
};