import React from "react";
import styles from "./LinkedInLogin.module.css";
import { getAuth, OAuthProvider, signInWithPopup } from "firebase/auth";

const LinkedInLogin = () => {
    const auth = getAuth()
    const provider = new OAuthProvider('linkedin.com');

    const signInWithLin = async () => {
        signInWithPopup(auth, provider).then((result) =>{
            const user = result.user
        })
        .catch((error) => {
            console.log(error)
        })
    }


    return (
        <button className={styles.btnRedeSocial} onClick={signInWithLin}>
            <i className="bi bi-linkedin"></i>
        </button>
    );
};

export default LinkedInLogin;
