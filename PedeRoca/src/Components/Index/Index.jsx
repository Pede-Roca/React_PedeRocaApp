import React, { useState } from 'react'
import styles from './Index.module.css'
import logo from '../../assets/Logo.svg'
import banner from '../../assets/Desktop_.svg'
import Carrocel from '../Carrocel/Carrocel'

const Index = () => {
  return (
    <>
        <div className={styles.CaixaLogo}>
          <img src={logo} alt="Logo Pede Roça" className={styles.logo} />
        </div>
        <img src={banner} alt="Logo Pede Roça" className={styles.DesktopBanner} />
        <Carrocel />
    </>
  )
}

export default Index
