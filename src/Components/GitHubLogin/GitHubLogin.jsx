import React from "react";
import styles from "./GitHublogin.module.css";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";

const GitHubLogin = () => {
  const auth = getAuth();
  const provider = new GithubAuthProvider();

  const signInWithGitHub = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <button className={styles.btnRedeSocial} onClick={signInWithGitHub}>
        <i className="bi bi-github"></i>
      </button>
    </>
  );
};

export default GitHubLogin;
