import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { getAuth, updateProfile } from "firebase/auth";
import axios from "axios"; 
import { atualizarFotoUsuarioNoBackend, atualizarFotoProdutoNoBackend } from '../services';

const storage = getStorage();

const uploadFile = async (file) => {
  const storageRef = ref(storage, `uploads/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    },
    (error) => {
      console.error(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
      });
    }
  );
};

const profileImage = async (file, uid, backendUserId) => {
  const storageRef = ref(storage, `Usuários/${uid}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);
    },
    (error) => {
      console.error(error);
    },
    async () => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          await updateProfile(user, {
            photoURL: downloadURL,
          });

          const data = await atualizarFotoUsuarioNoBackend(backendUserId, downloadURL);
          console.log("Foto de perfil atualizada:", data);
          
          return downloadURL;
        } else {
          console.error("Nenhum usuário autenticado encontrado.");
        }
      } catch (error) {
        console.error("Erro ao atualizar documento do usuário:", error);
        return null;
      }
    }
  );
};

const produtoImage = async (file, produtoId) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `Produtos/${produtoId}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Erro durante o upload:", error);
        reject(error); // Rejeitar a Promise se houver um erro no upload
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const data = await atualizarFotoProdutoNoBackend(produtoId, downloadURL); 
          
          if (data) {
            console.log("Foto do produto atualizada no backend com sucesso");
            resolve(downloadURL);
          } else {
            throw new Error("Erro ao atualizar a foto do produto no backend");
          }
        } catch (error) {
          console.error("Erro ao atualizar documento do produto:", error);
          reject(error);
        }
      }
    );
  });
};


export { uploadFile, profileImage, produtoImage };
