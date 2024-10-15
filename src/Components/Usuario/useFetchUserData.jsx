import { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import axios from "axios";

export const useFetchUserData = (userId, backendUserId) => {
    const [userData, setUserData] = useState({});
    const [enderecoData, setEnderecoData] = useState({});
    const [error, setError] = useState(null);
    const db = getFirestore();
    const phoneMask = (phone) => {
        return phone.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    };

    const cpfMask = (cpf) => {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    };

    const dateMask = (date) => {
        return date.replace(/(\d{4})-(\d{2})-(\d{2})T.*/, "$3/$2/$1");
    };

    useEffect(() => {
        const fetchUserData = async () => {
            if (!userId) return;
            if (!backendUserId) return;
            try {
                const [enderecoResponse, usuarioResponse] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_API_URL}Endereco/usuario/${backendUserId}`),
                    axios.get(`${import.meta.env.VITE_API_URL}Usuario/${backendUserId}`)
                ]);

                setUserData({
                    id: usuarioResponse.data.id,
                    nome: usuarioResponse.data.nome,
                    email: usuarioResponse.data.email,
                    cpf: cpfMask(usuarioResponse.data.cpf),
                    telefone: phoneMask(usuarioResponse.data.telefone),
                    dataNasc: dateMask(usuarioResponse.data.dataNasc),
                    nivelAcesso: usuarioResponse.data.nivelAcesso,
                    foto: usuarioResponse.data.uidFotoPerfil
                });

                setEnderecoData({
                    cep: enderecoResponse.data.cep,
                    logradouro: enderecoResponse.data.logradouro.split(" - ")[0],
                    cidade: enderecoResponse.data.cidade,
                    uf: enderecoResponse.data.uf,
                    bairro: enderecoResponse.data.bairro || enderecoResponse.data.logradouro.split(" - ")[1] || "",
                    numero: enderecoResponse.data.numero,
                    complemento: enderecoResponse.data.complemento
                });

            } catch (err) {
                console.error("Erro ao buscar dados do usuário:", err);
                setError(err.message);
            }
        };

        fetchUserData();
    }, [userId, db]);

    return {
        userData,
        enderecoData,
        error
    };
};
