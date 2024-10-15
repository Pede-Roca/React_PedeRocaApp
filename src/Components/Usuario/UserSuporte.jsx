import React from "react";
import styles from "./Usuario.module.css";

export const UserSuporte = ({ onBack }) => {
    return (
        <div>
            <h4 className={styles.titulo}>Redes Sociais</h4>
            <div className={styles.ContainerLinksSocial}>
                <a
                    href=""
                    target="_blank"
                    rel="noreferrer"
                    disabled
                    className={styles.socialink}
                >
                    <i className="bi bi-instagram" id={styles.instSVG}></i>Instagram
                </a>
                <a
                    href=""
                    target="_blank"
                    rel="noreferrer"
                    disabled
                    className={styles.socialink}
                >
                    <i className="bi bi-facebook" id={styles.faceSVG}></i>Facebook
                </a>
                <a
                    href=""
                    target="_blank"
                    rel="noreferrer"
                    disabled
                    className={styles.socialink}
                >
                    <i className="bi bi-envelope" id={styles.emailSVG}></i>Email
                </a>
            </div>
            <h4 className={styles.titulo}>Contato</h4>
            <div>
                <label htmlFor="Email" className={styles.label}>
                    Email
                </label>
                <input type="email" name="Email" className={styles.input} />
                <label htmlFor="Mensagem" className={styles.label}>
                    Conteúdo
                </label>
                <textarea name="Mensagem" className={styles.input2} />
                <button className={styles.btnEnviar}>Enviar</button>
            </div>
            <h4 className={styles.titulo}>Localização</h4>
            <p className={styles.endereco}>Av. Habib Gabriel, 1360</p>
            <p className={styles.endereco}>
                Jardim Buscardi, Matão - SP, 15990-539
            </p>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3709.1855904563968!2d-48.36269552475904!3d-21.61769059307542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b8e159d287a237%3A0x70df7e81597e2d08!2sFatec%20Mat%C3%A3o!5e0!3m2!1spt-BR!2sbr!4v1718590405337!5m2!1spt-BR!2sbr"
                width="100%"
                height="250"
                loading="lazy"
            ></iframe>
            
            <button onClick={onBack} className={styles.btnBack}>
                <i className="bi bi-arrow-return-left"></i>
            </button>
        </div>
    );
};
