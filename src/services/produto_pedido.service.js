import axios from "axios";

export const criarProdutoPedidoNoBackend = async (quantidadeProduto, idProduto) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}produto-pedido`, {
            quantidadeProduto,
            idProduto
        });

        return data;
    } catch (error) {
        console.error(error);
    }
}

export const atualizarQuantidadeProdutoPedidoNoBackend = async (idProdutoPedido, quantidade, adicionar) => {
    try {
        const { data } = await axios.put(`${import.meta.env.VITE_API_URL}produto-pedido/atualizar-quantidade-produto/${idProdutoPedido}`, {
            quantidade,
            adicionar
        });

        return {
            status: true,
            message: data.message
        };
    } catch (error) {
        console.error(error);
    }
}