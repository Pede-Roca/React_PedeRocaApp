import axios from "axios";

export const criarCategoriaNoBackend = async (payload) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}categoria`, payload);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const buscarCategoriasNoBackend = async () => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}categoria`);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const atualizarCategoriaNoBackend = async (id, payload) => {
    try {
        const { data } = await axios.put(`${import.meta.env.VITE_API_URL}categoria/${id}`, payload);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const deletarCategoriaNoBackend = async (id) => {
    try {
        const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}categoria/${id}`);
        return data;
    } catch (error) {
        console.error(error);
    }
}
