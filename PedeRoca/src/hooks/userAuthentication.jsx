import { db } from "../firebase/config";
import{
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
} from "firebase/auth";
import { useState, useEffect } from "react";

export const userAuthentication = () =>{
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(null);
    const [ cancelled, setCancelled ] = useState(false);

    const auth = getAuth();

    function checkIfIsCancelled(){
        if(cancelled){
            return
        }
    }

    async function createUser(data){
        checkIfIsCancelled();

        setLoading(true);
        setError(null);

        try{
            const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
            await updateProfile(user, { displayName: data.displayName });

            await updateProfile(user, {
                displayName: data.displayName
            });

            setLoading(false);

            return user;
        }catch(error){
            console.error(error.message);
            console.table(typeof error.message);

            let systemErrorMessage;

            if(error.message.includes("Password")){
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres";
            }else if(error.message.includes("Email-already")){
                systemErrorMessage = "Email já cadastrado";
            }else{
                systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde";
            }

            setLoading(false);
            setError(systemErrorMessage);
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

        try{
            await signInWithEmailAndPassword(auth, data.email, data.password);
            setLoading(false);
        }catch(error){
            console.error(error.message);
            console.table(typeof error.message);

            let systemErrorMessage;

            if(error.message.includes("invalid-login-credentials")){
                systemErrorMessage = "Usuário não encontrado";
            }else if(error.message.includes("wrong-password")){
                systemErrorMessage = "Email ou senha inválidos";
            }else{
                systemErrorMessage = "Ocorreu um erro, tente novamente mais tarde";
            }

            setLoading(false);
            setError(systemErrorMessage);
        }
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    return {
        auth,
        createUser,
        error,
        loading,
        logout,
        login
    }
}