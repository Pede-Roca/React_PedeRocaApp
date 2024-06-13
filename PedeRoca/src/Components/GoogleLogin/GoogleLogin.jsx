import React from "react";
import styles from "./GoogleLogin.module.css";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState, useEffect } from "react";
import { userAuthentication } from "../../hooks/userAuthentication";
import { useAuthValue } from "../../context/AuthContext";
import { auth } from "../../firebase/config";

const GoogleLogin = () => {
  const [error, setError] = useState("");
  const { user } = useAuthValue();
  const { login, error: authError, loading } = userAuthentication();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
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
      <i className="bi bi-google"></i>
    </button>
  );
};

export default GoogleLogin;
