import React from 'react';
import { useState } from 'react';
import styles from './Home.module.css';
import Carrocel from '../../Components/Carrocel/Carrocel';
import logo from '../../assets/Logo.svg';
import banner from '../../assets/Desktop_.svg';
import Produtos from '../../Components/Produtos/Produtos';
import FooterDesktop from './../../Components/FooterDesktop/FooterDesktop';
import PlanoAssinatura from '../../Components/PlanoAssinatura/planoAssinatura';

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <>
      <div className={styles.CaixaLogo}>
        <img src={logo} alt="Logo Pede Roça" className={styles.logo} />
      </div>
      <span onClick={handleShowModal} className={styles.clube}>
        <img
          src={banner}
          alt="Banner"
          className={styles.DesktopBanner}
        />
        <Carrocel />
      </span>
      
      <Produtos />
      <FooterDesktop />

      <PlanoAssinatura show={showModal} handleClose={handleCloseModal} />
    </>
  )
}

export default Home
