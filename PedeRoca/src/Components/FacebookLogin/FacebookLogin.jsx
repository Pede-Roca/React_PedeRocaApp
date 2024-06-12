import React from "react";
import styles from "./FacebookLogin.module.css";
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { useState, useEffect } from "react";
import { userAuthentication } from "../../hooks/userAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import { auth } from "../../firebase/config";

const FacebookLogin = () => {
  const [error, setError] = useState("");
  const { user } = useAuthValue();
  const { login, error: authError, loading } = userAuthentication();

  const handleLogin = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  });

  return (
    <button className={styles.btnRedeSocial} onClick={handleLogin}>
      <i class="bi bi-facebook"></i>
    </button>
  );
};

export default FacebookLogin;
