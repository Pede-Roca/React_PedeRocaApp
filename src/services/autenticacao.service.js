import axios from "axios";

export const efetuarLoginNoBackend = async (payload) => {
    try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_URL}login`, payload);
        const { token } = data;

        return `Bearer ${token}`;
    } catch (error) {
        console.error(error);
    }
}