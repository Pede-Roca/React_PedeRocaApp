import React from 'react'
import styles from './FooterDesktop.module.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

const FooterDesktop = () => {
  return (
    <>
        <footer id={styles.footer}  className='d-none d-md-block fixed-bottom'>
        <p>
            <i className="bi bi-c-circle"></i> Todos os direitos reservados aos alunos Hugo, Gabriel e Daniel
            - Fatec Matão
        </p>
        </footer>
    </>
  )
}

export default FooterDesktop
