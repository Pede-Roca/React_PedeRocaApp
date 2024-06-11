import React from "react";
import { useState } from "react";
import styles from "./ImgUploadWithView.module.css";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ImgUplaodWithView = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const storage = getStorage();

  const HandleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    const storageRef = ref(storage, `Produtos/${image.name}`);
    uploadBytes(storageRef, image).then((snapshot) => {
      console.log("imagem upload");
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
      });
    });
  };

  return (
    <>
      <input type="file" onChange={HandleFileChange} />
      <button onClick={handleSubmit}></button>
      {imageUrl && <img src={imageUrl} alt="Imagem enviada" />}
    </>
  );
};

export default ImgUplaodWithView;
