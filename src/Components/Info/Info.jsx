import React from 'react'
import styles from './Info.module.css'
import logo from '../../assets/Logo.svg'

const Info = () => {
  return (
    <div className={styles.divInfo}>
      <img src={logo} alt="Logo Pede Roça" className={styles.imgLogoLogin} />
      <h5 className={styles.titleInfo}>Missão</h5>
      <label className={styles.Info}>
        Facilitar a forma como você adquire produtos artesanais, 
        promovendo a agricultura familiar e valorizando os pequenos 
        produtores através da plataforma Pede Roça.
      </label>
      <h5 className={styles.titleInfo}>Visão</h5>
      <label className={styles.Info}>
        Ser a referência em soluções inovadoras para a compra de 
        produtos artesanais, oferecendo uma ampla variedade de 
        alimentos frescos e cultivados localmente, contribuindo 
        para uma alimentação mais saudável e sustentável.
      </label>
      <h5 className={styles.titleInfo}>Valores</h5>
      <label className={styles.Info}>
        Facilitar a forma como você adquire produtos artesanais,
        promovendo a agricultura familiar e valorizando os pequenos
        produtores através da plataforma Pede Roça.
        Ser a referência em soluções inovadoras para a compra de 
        produtos artesanais, oferecendo uma ampla variedade de 
        alimentos frescos e cultivados localmente, contribuindo 
        para uma alimentação mais saudável e sustentável.
      </label>
    </div>
  )
}

export default Info
