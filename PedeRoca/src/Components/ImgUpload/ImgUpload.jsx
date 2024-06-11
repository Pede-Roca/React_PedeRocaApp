import React from "react";
import { useState } from "react";
import { uploadFile } from "../../hooks/ImgUploadHook";
import styles from "./ImgUpload.module.css";

const ImgUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [envido, setEnvido] = useState(false);

  const HandleFileChange = (e) => {
    const file = e.target.files[0];
    uploadFile(file);
    setEnvido(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      uploadFile(selectedFile);
    }
  };

  return (
    <>
      <h5>Fazer upload da imagem</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={HandleFileChange}
          className={styles.input}
        />
        {envido && <p>Imagem enviado</p>}
      </form>
    </>
  );
};

export default ImgUpload;
