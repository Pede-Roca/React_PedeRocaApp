import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const auth = getAuth();

export const capturarIdDoUsuarioESetarNoLocalStorage = async () => {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    let backendId = null;
    
    if(!userData) {
        await getDoc(doc(db, "tb_usuarios", auth.currentUser.uid)).then((doc) => {
            if (doc.exists()) {
                let data = doc.data();
                sessionStorage.setItem("user", JSON.stringify({
                    ...auth.currentUser,
                    backendId: data.backendId
                }));

                backendId = data.backendId;
            } else {
                console.log("Erro ao buscar usuário");
            }
        }).catch((error) => {
            console.log("Erro ao buscar um documento", error);
        })
    } else {
        backendId = userData.backendId;
    }
    
    return backendId;
}