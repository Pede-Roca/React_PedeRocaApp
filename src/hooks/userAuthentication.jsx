import { db } from "../firebase/config";
import { useState, useEffect } from "react";
import { registrarUsuarioNoBackend, criarEnderecoNoBackend, efetuarLoginNoBackend } from '../services';
import { jwtDecode } from "jwt-decode";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

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
            const userToBackend = {
                email: data.email,
                senha: data.password,
                nome: data.displayName,
                telefone: data.phone,
                cpf: data.cpf,
                dataNasc: data.dob,
                uidFotoPerfil: "",
            };

            const { backendUserId, token } = await registrarUsuarioNoBackend(userToBackend);

            if (!backendUserId) {
                setLoading(false);
                return setError("Erro ao criar usuário, tente novamente mais tarde.");
            }

            sessionStorage.setItem("token", token);

            const enderecoToBackend = {
                cep: data.address.cep,
                cidade: data.address.city,
                estado: data.address.state,
                logradouro: data.address.street,
                bairro: data.address.neighborhood,
                numero: data.address.number,
                complemento: data.address.complement || "",
                idUsuario: backendUserId
            };

            const resultEnd = await criarEnderecoNoBackend(enderecoToBackend); // resultEnd tem id e message

            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);

            await updateProfile(user, {
                displayName: data.displayName,
                photoURL: ""
            });

            await setDoc(doc(db, "tb_usuarios", user.uid), { backendId: backendUserId });

            sessionStorage.setItem("user", JSON.stringify({
                ...user,
                backendId: backendUserId
            }));

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
        sessionStorage.clear();
    }

    const login = async (data) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(null);

        try {
            const token = await efetuarLoginNoBackend({ email: data.email, senha: data.password });
            if (!token) {
                setLoading(false);
                return { user: null, message: "Erro ao logar, tente novamente mais tarde", status: false };
            }

            const decodedToken = jwtDecode(token);
            const userId = decodedToken.id;

            const result = await signInWithEmailAndPassword(auth, data.email, data.password);

            setLoading(false);
            sessionStorage.setItem("token", token);
            sessionStorage.setItem("user", JSON.stringify({
                ...result.user,
                backendId: userId
            }));

            return { user: result.user, message: "Usuário logado com sucesso", status: true };
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
    };


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
