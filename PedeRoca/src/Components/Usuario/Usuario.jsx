import React, { useState, useEffect } from 'react';
import styles from './Usuario.module.css';
import EnderecoEntrega from '../EnderecoEntrega/EnderecoEntrega';
import DadosPessoais from '../DadosPessoais/DadosPessoais';
import SuporteUsuario from '../SuporteUsuario/SuporteUsuario';
import { useAuthValue } from "../../context/AuthContext";
import { getDocs, collection } from 'firebase/firestore'
import { db } from '../../firebase/config'

const Usuario = () => {
  const { user, logout } = useAuthValue();
  const [currentSection, setCurrentSection] = useState('profile');
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const usuariosCollectionRef = collection(db, 'tb_usuarios')

  const handleLogoutClick = () => {
    setLoading(true);
    logout();
    setLoading(false);
  };

  useEffect(() => { 

    {/*Obter dados de usuário*/}
    const getUsuarios = async () => {
      const data = await getDocs(usuariosCollectionRef)
      setUsuarios(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    getUsuarios()
  }, []);

  const renderSection = () => {
    switch (currentSection) {
      case 'Endereço Entrega':
        return <EnderecoEntrega user={usuarios.length > 0 ? usuarios[0] : null} onBack={() => setCurrentSection('profile')} />;
      case 'Dados Pessoais':
        return <DadosPessoais user={usuarios.length > 0 ? usuarios[0] : null} onBack={() => setCurrentSection('profile')} />;
      case 'Suporte Usuario':
        return <SuporteUsuario user={usuarios.length > 0 ? usuarios[0] : null} onBack={() => setCurrentSection('profile')} />;
      default:
        return (
          <div className={styles.div_area_do_usuario}>
            <img className={styles.foto_usuario} src={usuarios.length > 0 ? usuarios[0].foto : ''} alt="Foto_Usuario" />
            <div className={styles.nome_usuario}>{usuarios.length > 0 ? usuarios[0].nome : ''}</div>
            <button className={styles.btn_usuario} onClick={() => setCurrentSection('Endereço Entrega')}>
              Endereço de Entrega
            </button>
            <button className={styles.btn_usuario} onClick={() => setCurrentSection('Dados Pessoais')}>
              Dados Pessoais
            </button>
            <button className={styles.btn_usuario} onClick={() => setCurrentSection('Suporte Usuario')}>
              Suporte ao Usuario
            </button>
            {!loading ? (
              <button className={styles.btn_sair} onClick={handleLogoutClick}>
                Sair
              </button>
            ) : (
              <button className={styles.btn_sair} disabled>
                Saindo...
              </button>
            )}
          </div>
        );
    }
  };

  return <>{renderSection()}</>;
};

export default Usuario;