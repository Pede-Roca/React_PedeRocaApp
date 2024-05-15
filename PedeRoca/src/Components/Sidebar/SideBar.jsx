import React, { useState } from 'react'
import { Button, Offcanvas, OffcanvasHeader } from 'react-bootstrap'
import styles from './SideBar.module.css'
import './SideBar.module.css'
import Login from '../Login/Login'
import Carrinho from '../Carrinho/Carrinho'
import Info from '../Info/Info'

const SideBar = () => {
  const [show, setShow] = React.useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [menuNav, setMenuNav] = useState(1)

  const options = [
    {
      name: 'Enable backdrop (glass)',
      scroll: false,
      backdrop: 'static',
      backdropClassName: 'bg-glass',
      keyboard: true,
      responsive: 'md',
    }
  ];

  return (
    <>
      <button type="button" className="btn btn-primary" id={styles.Button} onClick={handleShow}>
        <i className="bi bi-list"> Menu</i>
      </button>

      <Offcanvas show={show} onHide={handleClose} placement="end">
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
      </Offcanvas>
    </>
  )
}

export default SideBar
