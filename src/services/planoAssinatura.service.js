import axios from "axios";

export const assinarPlano = async (payload) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}plano-assinatura`, payload);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const listarPlanosAssinatura = async () => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}plano-assinatura`);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const atualizarPlanoAssinatura = async (id, payload) => {
    try {
        const { data } = await axios.put(`${import.meta.env.VITE_API_URL}plano-assinatura/${id}`, payload);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const getPlanoAssinaturaPorId = async (id) => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}plano-assinatura/${id}`);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const deletarPlanoAssinatura = async (id) => {
    try {
        const { data } = await axios.delete(`${import.meta.env.VITE_API_URL}plano-assinatura/${id}`);
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const cancelarPlanoAssinaturaDoUsuario = async (idUsuario) => {
    try {
        const { data: planos } = await axios.get(`${import.meta.env.VITE_API_URL}plano-assinatura?usuarioId=${idUsuario}`);
        
        if (planos.length === 0) {
            console.error("Plano de assinatura não encontrado para o usuário especificado.");
            return null;
        }
        const plano = planos[0];
        const payload = { ...plano, status: 0 };
        const { data } = await axios.put(`${import.meta.env.VITE_API_URL}plano-assinatura/${plano.id}`, payload);
        
        return data;

    } catch (error) {
        console.error(error);
    }
};

