import axios from "axios";
import { capturarIdDoUsuarioESetarNoLocalStorage } from "../services";

export const favoritarProdutoNoBackend = async (payload) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}favoritos`, payload);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const desfavoritarProdutoNoBackend = async (id) => {
    try {
        const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}favoritos/${id}`);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const buscarProdutosFavoritosPorUsuarioNoBackend = async () => {
    try {
        const backendId = await capturarIdDoUsuarioESetarNoLocalStorage();
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}favoritos/buscar-todos-por-usuario/${backendId}`);
        return data;
    } catch (error) {
        console.error(error);
    }
}