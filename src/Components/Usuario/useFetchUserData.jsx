import { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import { buscarEnderecoPorIdDoUsuarioNoBackend, buscarUsuarioPorIdNoBackend } from '../../services';

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
                const enderecoResponse = await buscarEnderecoPorIdDoUsuarioNoBackend();
                const usuarioResponse = await buscarUsuarioPorIdNoBackend(backendUserId);

                setUserData({
                    id: usuarioResponse.id,
                    nome: usuarioResponse.nome,
                    email: usuarioResponse.email,
                    cpf: cpfMask(usuarioResponse.cpf),
                    telefone: phoneMask(usuarioResponse.telefone),
                    dataNasc: dateMask(usuarioResponse.dataNasc),
                    nivelAcesso: usuarioResponse.nivelAcesso,
                    foto: usuarioResponse.uidFotoPerfil
                });

                setEnderecoData({
                    cep: enderecoResponse.cep,
                    logradouro: enderecoResponse.logradouro,
                    cidade: enderecoResponse.cidade,
                    uf: enderecoResponse.uf,
                    bairro: enderecoResponse.bairro,
                    numero: enderecoResponse.numero,
                    complemento: enderecoResponse.complemento
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
