import React, { useState } from "react";
import { useAuthValue } from "../../context/AuthContext";
import styles from "./NavBarMobile.module.css";
import Login from "../Login/Login";
import Carrinho from "../Carrinho/Carrinho";
import Info from "../Info/Info";
import Receitas from "../Receitas/Receitas";

const NavBarMobile = () => {
    const { user } = useAuthValue();
    const [menuNav, setMenuNav] = useState(0);
    const [showOverlay, setShowOverlay] = useState(false);
  
    const handleCloseOverlay = () => setShowOverlay(false);
    const handleShowOverlay = () => setShowOverlay(true);
  
    const changeToLogin = () => {
        setMenuNav(1);
        handleShowOverlay(); 
    };

    const renderContent = () => {
        switch (menuNav) {
            case 1:
                return <Carrinho close={handleCloseOverlay} />;
            case 2:
                return <Login />;
            case 3:
                return <Info />;
            case 4:
                return <Receitas />;
            default:
                return <Login />;
        }
    };

    return (
        <>
            <div className={styles.NavContainerMobile}>
                <div className={styles.OpcoesNav}>
                    <button
                        type="button"
                        className={menuNav === 0 ? styles.btnNavUserActive : styles.btnNavCart}
                        onClick={() => { setMenuNav(0); handleShowOverlay(); }}
                    >
                        <i class="bi bi-basket"></i>
                    </button>
                    <p>Produtos</p>
                </div>
                <div className={styles.OpcoesNav}>
                    <button
                        type="button"
                        className={menuNav === 1 ? styles.btnNavUserActive : styles.btnNavCart}
                        onClick={() => { setMenuNav(1); handleShowOverlay(); }}
                    >
                        <i className="bi bi-cart4"></i>
                    </button>
                    <p>Carrinho</p>
                </div>
                <div className={styles.OpcoesNav}>
                    <button
                        type="button"
                        className={menuNav === 2 ? styles.btnNavUserActive : styles.btnNavCart}
                        onClick={() => { setMenuNav(2); handleShowOverlay(); }}
                    >
                        <i className="bi bi-person"></i>
                    </button>
                    <p>Usuário</p>
                </div>
                <div className={styles.OpcoesNav}>
                    <button
                        type="button"
                        className={menuNav === 3 ? styles.btnNavUserActive : styles.btnNavCart}
                        onClick={() => { setMenuNav(3); handleShowOverlay(); }}
                    >
                        <i className="bi bi-info-lg"></i>
                    </button>
                    <p>Sobre</p>
                </div>
                <div className={styles.OpcoesNav}>
                    <button
                        type="button"
                        className={menuNav === 4 ? styles.btnNavUserActive : styles.btnNavCart}
                        onClick={() => { setMenuNav(4); handleShowOverlay(); }}
                    >
                        <i className="bi bi-chat-left-text"></i>
                    </button>
                    <p>Receitas</p>
                </div>
            </div>
            {menuNav !== 0 && <>
                {showOverlay && (
                <div className={styles.overlay}>
                    <div className={styles.overlayBody}>
                        {renderContent()}
                    </div>
                </div>
                )}
            </>}

        </>
    );
};

export default NavBarMobile;
