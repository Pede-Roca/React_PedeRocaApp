import React from 'react'
import styles from './SuporteUsuario.module.css'

const SuporteUsuario = ({ user, onBack }) => {
  return (
    <>
    <h3 className={styles.titleRedesSociais}>Redes Sociais</h3>
    <div className={styles.div_redes_sociais}>
          <a href="" className={styles.links_redes_sociais}>
            <i className="bi bi-facebook" id={styles.icone_facebook}></i>
            <div className={styles.label_redes_sociais}>Facebook</div>
          </a>
          <a href="" className={styles.links_redes_sociais}>
            <i className="bi bi-instagram" id={styles.icone_instagram}></i>
            <div className={styles.label_redes_sociais}>Instagram</div>
          </a>
          <a href="" className={styles.links_redes_sociais}>
            <i className="bi bi-envelope-fill" id={styles.icone_email}></i>
            <div className={styles.label_redes_sociais}>Email</div>
          </a>
    </div>
    <div>
      <h3 className={styles.titleContato}>Contato</h3>
        <h3>Email</h3>
      <input className={styles.inputs_suporte} placeholder={user.email}></input>
      <h3>Conteúdo</h3>
        <textarea className={styles.textarea_suporte} placeholder="Máximo 500 caracteres.">
        </textarea>
        <button className={styles.btn_suporte}>Enviar</button>
    </div>

    <h3 className={styles.titleLocalizacao}>Localização</h3>
    <label className={styles.label_endereco}>
      Av. Habib Gabriel, 1360
      Jardim Buscardi, Matão - SP, 15990-539
    </label>
    <div className={styles.mapa_localização}>

    </div>
    <div className={styles.div_voltar}>
        <button className={styles.btn_voltar} onClick={onBack}>
          <i className="bi bi-arrow-return-left" id={styles.icone_voltar}></i>
        </button>
      </div>
    </>
  )
}

export default SuporteUsuario;