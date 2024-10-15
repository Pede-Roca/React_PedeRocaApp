import { useState, useEffect } from "react";
import { getDocs, collection, query, where, getFirestore } from "firebase/firestore";
import { auth } from "../../firebase/config";
import { userAuthentication } from "../../hooks/userAuthentication";


export const useAuth = () => {
    const db = getFirestore();
    const { logout } = userAuthentication();
    const [userId, setUserId] = useState("");
    const [backendUserId, setBackendUserId] = useState("");

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                const userQuery = query(collection(db, "tb_usuarios"));
                const querySnapshot = await getDocs(userQuery);

                const { backendId } = querySnapshot.docs.map((doc) => {
                    return { id: doc.id, ...doc.data() };
                }).find((userDoc) => userDoc.id === user.uid);
                
                setBackendUserId(backendId)
                setUserId(user.uid);
            }
        });

        return () => unsubscribe();
    }, []);

    return { userId, backendUserId, logout };
};
