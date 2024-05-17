import React, { useState } from 'react'
import { Button, Offcanvas, OffcanvasHeader } from 'react-bootstrap'
import styles from './SideBar.module.css'
import './SideBar.module.css'
import Login from '../Login/Login'
import Carrinho from '../Carrinho/Carrinho'
import Info from '../Info/Info'

const SideBar = () => {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [menuNav, setMenuNav] = useState(1)

  return (
    <>
      <button type="button" className="btn btn-primary" id={styles.Button} onClick={handleShow}>
        <i className="bi bi-list"> Menu</i>
      </button>

      <Offcanvas show={show} onHide={handleClose} placement="end" className='hideMobile'>
        <Offcanvas.Header closeButton>
          <div className={styles.NavSideBar}>
            <button type="button" className={styles.btnNavCart} onClick={() => setMenuNav(0)}><i className="bi bi-cart4"></i></button>
            <button type="button" className={styles.btnNavUser} onClick={() => setMenuNav(1)}><i className="bi bi-person"></i></button>
            <button type="button" className={styles.btnNavInfo} onClick={() => setMenuNav(2)}><i className="bi bi-info-lg"></i></button>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {menuNav == 1 && <Login />}
          {menuNav == 0 && <Carrinho />}
          {menuNav == 2 && <Info />}
        </Offcanvas.Body>
          <div className={styles.footer}>
            <div className={styles.footerContent}>
              <div className={styles.hideNavMobile}>
                <div>
                  <button type="button" className={styles.btnNavCart} onClick={() => setMenuNav(0)}><i className="bi bi-cart4"></i></button>
                  <p className={styles.nomeNav}>Carrinho</p>
                </div>
                <div>
                  <button type="button" className={styles.btnNavUser} onClick={() => setMenuNav(1)}><i className="bi bi-person"></i></button>
                  <p className={styles.nomeNav}>Usuário</p>
                </div>
                <div>
                  <button type="button" className={styles.btnNavInfo} onClick={() => setMenuNav(2)}><i className="bi bi-info-lg"></i></button>
                  <p className={styles.nomeNav}>Info</p>
                </div> 
            </div>
          </div>
        </div>
      </Offcanvas>
    </>
  )
}

export default SideBar
