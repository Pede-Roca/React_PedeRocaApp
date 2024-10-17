import axios from "axios";

export const criarEnderecoNoBackend = async (payload) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}endereco`, payload);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const atualizarEnderecoNoBackend = async (id, payload) => {
    try {
        const { data } = await axios.put(`${import.meta.env.VITE_API_URL}endereco/${id}`, payload);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const buscarEnderecoPorIdDoUsuarioNoBackend = async (id) => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}endereco/usuario/${id}`);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const buscarTodosEnderecosNoBackend = async () => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}endereco`);
        return data;
    } catch (error) {
        console.error(error);
    }
}