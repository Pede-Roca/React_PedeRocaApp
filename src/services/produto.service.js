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

export const atualizarProdutoNoBackend = async (id, payload) => {
    try {
        const { data } = await axios.put(`${import.meta.env.VITE_API_URL}produto/${id}`, payload);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const buscarProdutosSemEstoqueNoBackend = async () => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}produto/sem-estoque`);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const buscarProdutosTop10NoBackend = async () => {
    try {
        //const { data } = await axios.get(`${import.meta.env.VITE_API_URL}produto/top-10`);
        var data = [
            {"nome": "Banana", "quantidadeVendida": 100, "valorTotal": 10.80},
            {"nome": "Maça", "quantidadeVendida": 200, "valorTotal": 20.80},
            {"nome": "Cenoura", "quantidadeVendida": 300, "valorTotal": 30.80}
        ];
        return data;
    } catch (error) {
        console.error(error);
    }
}