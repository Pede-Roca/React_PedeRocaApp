import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./useAuth";
import { UserHome } from "./UserHome";
import { UserEndereco } from "./UserEndereco";
import { UserDadosPessoais } from "./UserDadosPessoais";
import { UserSuporte } from "./UserSuporte";
import { UserCompras } from './UserCompras';

const Usuario = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [activePage, setActivePage] = useState("home");

    const handleNavigation = (page) => {
        setActivePage(page);
    };

    const handleAdminNavigation = () => {
        navigate('/admin');
    };

    const renderPage = () => {
        switch (activePage) {
            case "endereco":
                return <UserEndereco onBack={() => handleNavigation("home")} />;
            case "dadosPessoais":
                return <UserDadosPessoais onBack={() => handleNavigation("home")} />;
            case "suporte":
                return <UserSuporte onBack={() => handleNavigation("home")} />;
            case "minhasCompras":
                return <UserCompras onBack={() => handleNavigation("home")} />;
            default:
                return <UserHome onLogout={logout} onNavigate={handleNavigation} onAdmin={handleAdminNavigation} />;
        }
    };

    return (
        <div>
            {renderPage()}
        </div>
    );
};

export default Usuario;
