import React, { useRef, useState } from "react";
import styles from "./Usuario.module.css";
import { useFetchUserData } from "./useFetchUserData";
import { useAuth } from "./useAuth";
import { profileImage } from "../../hooks/ImgUploadHook";

export const UserHome = ({ onNavigate, onAdmin, onLogout }) => {
    const { userId, backendUserId } = useAuth();
    const { userData } = useFetchUserData(userId, backendUserId);
    const fileInputRef = useRef(null);
    const [tempPhoto, setTempPhoto] = useState(null);

    const handleChangePhoto = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const tempImgUrl = URL.createObjectURL(file);
            setTempPhoto(tempImgUrl);
            profileImage(file, userId, backendUserId);
        }
    };

    return (
        <div>
            {userData && (
                <div key={userData.id} className={styles.userData}>
                    <div className={styles.fotoContainer}>
                        {userData.foto == "" && (
                            <img className={styles.foto} src="https://placehold.co/800x800?text=Sem+Imagem" alt="foto do usuário" />
                        )}
                        {tempPhoto != null || userData.foto != "" && (
                            <img className={styles.foto} src={tempPhoto || userData.foto} alt="foto do usuário" />
                        )}
                        <button className={styles.btnTrocarFoto} onClick={handleChangePhoto}>
                            <i className="bi bi-pencil"></i>
                        </button>
                    </div>
                    <h4 className={styles.nomeUser}>{userData.nome}</h4>
                    {userData.nivelAcesso === "adm" && (
                        <button className={styles.btnDados} onClick={onAdmin}>ADM</button>
                    )}
                </div>
            )}
            <div className={styles.containerBTN}>
                <button className={styles.btnDados} onClick={() => onNavigate("minhasCompras")}>Minhas Compras</button>
                <button className={styles.btnDados} onClick={() => onNavigate("endereco")}>Endereço de Entrega</button>
                <button className={styles.btnDados} onClick={() => onNavigate("dadosPessoais")}>Dados Pessoais</button>
                <button className={styles.btnDados} onClick={() => onNavigate("suporte")}>Suporte ao Usuário</button>
                <button className={styles.btnSair} onClick={onLogout}>Sair</button>
            </div>
            <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                ref={fileInputRef}
                onChange={handleFileChange}
            />
        </div>
    );
};
