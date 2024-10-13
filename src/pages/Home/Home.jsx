import React from 'react';
import styles from './Home.module.css';
import Carrocel from '../../Components/Carrocel/Carrocel';
import logo from '../../assets/Logo.svg';
import banner from '../../assets/Desktop_.svg';
import Products from '../../Components/Products/Products';
import FooterDesktop from './../../Components/FooterDesktop/FooterDesktop';

const Home = () => {
  return (
    <>
        <div className={styles.CaixaLogo}>
          <img src={logo} alt="Logo Pede Roça" className={styles.logo} />
        </div>

        <img src={banner} alt="Logo Pede Roça" className={styles.DesktopBanner} />
        <Carrocel />
        <Products />
        <FooterDesktop />
    </>
  )
}

export default Home
