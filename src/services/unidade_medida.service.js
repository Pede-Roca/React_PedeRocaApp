import axios from "axios";

export const buscarUnidadesMedidaNoBackend = async () => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}unidade-medida`);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const criarUnidadeMedidaNoBackend = async (unidadeMedida) => {
    try {
        await axios.post(`${import.meta.env.VITE_API_URL}unidade-medida`, unidadeMedida);
    } catch (error) {
        console.error(error);
    }
}

export const atualizarUnidadeMedidaNoBackend = async (id, unidadeMedida) => {
    try {
        await axios.put(`${import.meta.env.VITE_API_URL}unidade-medida/${id}`, unidadeMedida);
    } catch (error) {
        console.error(error);
    }
}

export const deletarUnidadeMedidaNoBackend = async (id) => {
    try {
        await axios.delete(`${import.meta.env.VITE_API_URL}unidade-medida/${id}`);
    } catch (error) {
        console.error(error);
    }
}