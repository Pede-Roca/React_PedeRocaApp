// eslint-disable-next-line no-unused-vars
import React from 'react'
import styles from './DadosPessoais.module.css'

const DadosPessoais = ({ user, onBack }) => {
  return (
    <div  className={styles.div_dados_usuario}>
      <h3 className={styles.titleDados}>Informações Pessoais</h3>
      <h3>Nome</h3>
      <input placeholder={user.nome} className={styles.inputs_dados_pessoais}></input>
      <h3>CPF</h3>
      <input placeholder={user.cpf}  className={styles.inputs_dados_pessoais}></input>
      <h3>Telefone</h3>
      <input placeholder={user.telefone} className={styles.inputs_dados_pessoais}></input>
      <h3>E-mail</h3>
      <input placeholder={user.email}  className={styles.inputs_dados_pessoais}></input>
      <button className={styles.btn_entrega}>Alterar</button>
      <button className={styles.btn_entrega}>Salvar</button>
      <div className={styles.div_voltar}>
        <button className={styles.btn_voltar} onClick={onBack}>
          <i className="bi bi-arrow-return-left" id={styles.icone_voltar}></i>
        </button>
      </div>
    </div>
  )
}

export default DadosPessoais;