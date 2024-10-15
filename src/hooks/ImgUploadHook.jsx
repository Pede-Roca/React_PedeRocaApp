import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import { getAuth, updateProfile } from "firebase/auth";
import axios from "axios"; // Certifique-se de que axios está importado

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

          const { data } = await axios.put(`${import.meta.env.VITE_API_URL}Usuario/FotoPerfil/${backendUserId}`, {
            uidFotoPerfil: downloadURL,
          });
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

export { uploadFile, profileImage };
