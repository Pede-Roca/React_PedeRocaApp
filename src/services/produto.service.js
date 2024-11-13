import axios from "axios";

export const criarProdutoNoBackend = async (payload) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}produto`, payload);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const buscarProdutosNoBackend = async () => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}produto`);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const buscarProdutoPorIdNoBackend = async (id) => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}produto/${id}`);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const atualizarProdutoNoBackend = async (id, payload) => {
    try {
        const { data } = await axios.put(`${import.meta.env.VITE_API_URL}produto/${id}`, payload);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const atualizarFotoProdutoNoBackend = async (id, uidFotoProduto) => {
    try {
        const { data: responseData } = await axios.put(
            `${import.meta.env.VITE_API_URL}produto/alterar-foto-produto/${id}`,
            { uidFotoProduto },
            { headers: { "Content-Type": "application/json" } }
        );

        return responseData;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const alterarStatusProduto = async (id, status) => {
    try {
        const { data: responseData } = await axios.put(
            `${import.meta.env.VITE_API_URL}produto/alterar-status-produto/${id}`,
            { status },
            { headers: { "Content-Type": "application/json" } }
        );

        return responseData;
    } catch (error) {
        console.error("Erro ao alterar o status do produto:", error);
        return null;
    }
};

export const buscarProdutosSemEstoqueNoBackend = async () => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}produto/sem-estoque`);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const numeroProdutosForaDeEstoque = async () => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}produto/sem-estoque`);
        return data.length;
    } catch (error) {
        console.error(error);
    }
}

export const buscarProdutosTop10NoBackend = async () => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}carrinho-compra/produtos-mais-vendidos`);
        return data;
    } catch (error) {
        console.error(error);
    }
}