import axios from "axios";
import { toast } from "react-toastify";
import { capturarIdDoUsuarioESetarNoLocalStorage } from "../services";

export const favoritarProdutoNoBackend = async (payload) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}favoritos`, payload);
        toast.success("Produto favoritado com sucesso!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        return data;
    } catch (error) {
        console.error(error);
        toast.error("Erro ao favoritar o produto.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }
};

export const desfavoritarProdutoNoBackend = async (id) => {
    try {
        const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}favoritos/${id}`);
        toast.success("Produto removido dos favoritos com sucesso!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
        return data;
    } catch (error) {
        console.error(error);
        toast.error("Erro ao remover o produto dos favoritos.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    }
};

export const buscarProdutosFavoritosPorUsuarioNoBackend = async () => {
    try {
        const backendId = await capturarIdDoUsuarioESetarNoLocalStorage();
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}favoritos/buscar-todos-por-usuario/${backendId}`);
        return data;
    } catch (error) {
        console.error(error);
    }
}