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

export const registrarProdutoFavoritoNoBackend = async (payload) => {
    try {
        //const { data } = await axios.post(`${import.meta.env.VITE_API_URL}produto-favorito`, payload);
        const data = {"id":"2GKVAxCASEBXbwuwedpM"}
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const desregistrarProdutoFavoritoNoBackend = async (id) => {
    try {
        //const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}produto-favorito/${id}`);
        const data = {"id":"2GKVAxCASEBXbwuwedpM"}
        return data;
    } catch (error) {
        console.error(error);
    }
}