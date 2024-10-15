import { db } from "../firebase/config";
import { useState, useEffect } from "react";
import axios from "axios";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const userAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    async function createUser(data) {
        checkIfIsCancelled();
        setLoading(true);
        setError(null);

        try {
            // Dados para o backend
            const userToBackend = {
                email: data.email,
                senha: data.password,
                nome: data.displayName,
                telefone: data.phone,
                cpf: data.cpf,
                dataNasc: data.dob,
                uidFotoPerfil: "",
                createUserDate: formatDate(Date.now()),
                status: true,
                nivelAcesso: "comum"
            };

            // Criação do usuário no backend
            const responseCreateUser = await axios.post(`${import.meta.env.VITE_API_URL}Usuario`, userToBackend);
            const backendUserId = responseCreateUser.data.id;

            // Dados de endereço para o backend
            const enderecoToBackend = {
                cep: data.address.cep,
                cidade: data.address.city,
                estado: data.address.state,
                logradouro: `${data.address.street} - ${data.address.neighborhood}`,
                numero: data.address.number,
                complemento: data.address.complement || "",
                idUsuario: backendUserId
            };

            // Criação do endereço no backend
            await axios.post(`${import.meta.env.VITE_API_URL}Endereco`, enderecoToBackend);

            // Criação do usuário no Firebase Authentication
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);

            // Atualiza o perfil no Firebase (somente nome e foto são permitidos)
            await updateProfile(user, {
                displayName: data.displayName,
                photoURL: ""
            });

            // Salva o backendId no Firestore (ou outro banco de dados)
            await setDoc(doc(db, "tb_usuarios", user.uid), { backendId: backendUserId });

            setLoading(false);
            return user;
        } catch (error) {
            console.error('Erro ao criar usuário:', error.message);

            let systemErrorMessage;

            if (error.message.includes("Password")) {
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres.";
            } else if (error.message.includes("Email-already")) {
                systemErrorMessage = "Este e-mail já está cadastrado.";
            } else {
                systemErrorMessage = "Ocorreu um erro ao criar o usuário, tente novamente mais tarde.";
            }

            setError(systemErrorMessage);
            setLoading(false);
        }
    }

    const logout = () => {
        checkIfIsCancelled();
        signOut(auth);
    }

    const login = async (data) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(null);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);
        } catch (error) {
            console.error(error.message);

            let systemErrorMessage;

            if (error.message.includes("invalid-login-credentials")) {
                systemErrorMessage = "Usuário não encontrado";
            } else if (error.message.includes("wrong-password")) {
                systemErrorMessage = "Email ou senha inválidos";
            } else {
                systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde";
            }

            setLoading(false);
            setError(systemErrorMessage);
        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    };
};
