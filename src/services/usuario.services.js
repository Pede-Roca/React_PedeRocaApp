import axios from "axios";

export const registrarUsuarioNoBackend = async (payload) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}usuario`, payload);
        const { token, id } = data;

        return { backendUserId: id, token: `Bearer ${token.token}` };
    } catch (error) {
        console.error(error);
    }
}

export const atualizarUsuarioNoBackend = async (id, payload) => {
    try {
        const { data } = await axios.put(`${import.meta.env.VITE_API_URL}usuario/${id}`, payload);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const alterarStatusUsuarioNoBackend = async (id, status) => {
    try {
        const { data } = await axios.put(`${import.meta.env.VITE_API_URL}usuario/alterar-status-usuario/${id}`, {
            status
        });

        return data;
    } catch (error) {
        console.error(error);
    }
}

export const atualizarFotoUsuarioNoBackend = async (id, payload) => {
    try {
        const { data } = await axios.put(`${import.meta.env.VITE_API_URL}usuario/alterar-foto-perfil/${id}`, {
            uidFotoPerfil: payload
        });
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const buscarUsuarioPorIdNoBackend = async (id) => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}usuario/${id}`);
        return data;
    } catch (error) {
        console.error(error);
    }
}

export const buscarTodosUsuariosNoBackend = async () => {
    try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}usuario`);
        return data;
    } catch (error) {
        console.error(error);
    }
}
