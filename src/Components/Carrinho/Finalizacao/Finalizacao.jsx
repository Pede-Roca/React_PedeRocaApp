import React, { useEffect, useState } from 'react';
import styles from '../Carrinho.module.css';
import { buscarUsuarioPorIdNoBackend, buscarEnderecoPorIdDoUsuarioNoBackend, capturarIdDoUsuarioESetarNoLocalStorage } from '../../../services';

export const Finalizacao = ({ frete, pagamento, produtos }) => {
    const [usuario, setUsuario] = useState({});
    const [endereco, setEndereco] = useState({});

    const tiposEntrega = {
        Economica: 4,
        Rapida: 15,
        Agendada: 10,
    };

    const prazoEntrega = {
        Economica: 3,
        Rapida: 0.5,
        Agendada: 0,  // Ajustar se necessário
    };

    const totalProdutos = produtos.reduce((total, produto) => total + produto.preco * produto.quantidade, 0);
    const valorFrete = tiposEntrega[frete] || 0; // Garantir que não retorne undefined

    const calcularDataEntrega = () => {
        const data = new Date();
        const prazo = prazoEntrega[frete] || 0; // Garantir que não retorne undefined
        data.setDate(data.getDate() + prazo);
        return data.toLocaleDateString('pt-BR', {
            weekday: 'long',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        });
    };

    const maskCPF = (cpf) => {
        return cpf ? cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") : ''; // Garantir que o CPF está presente
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                let backendId = await capturarIdDoUsuarioESetarNoLocalStorage();
            
                const userReturn = await buscarUsuarioPorIdNoBackend(backendId);
                setUsuario(userReturn);

                const enderecoReturn = await buscarEnderecoPorIdDoUsuarioNoBackend();
                setEndereco(enderecoReturn);
            } catch (error) {
                console.error("Erro ao buscar os dados do usuário", error);
            }
        };
        fetchUserData();
    }, []);

    return (
        <div>
            {/*
            
            
            */}
            <h5 className={styles.tituloCarrinho}>Finalização</h5>
            <h5 className={styles.sumario}>Sumário</h5>
            <div className={styles.contFinalizacao}>
                <p>Produtos</p>
                <p>R$ {totalProdutos.toFixed(2)}</p>
            </div>
            <div className={styles.contFinalizacao}>
                <p>Frete</p>
                <span>R$ {valorFrete.toFixed(2)}</span>
            </div>
            <div className={styles.contFinalizacao}>
                <p>Total</p>
                <p>R$ {(totalProdutos + valorFrete).toFixed(2)}</p>
            </div>
            <div>
                <p className={styles.textoNome}>{usuario.nome || 'Nome do usuário'}</p>
                <p className={styles.texto}>
                    {endereco ? `${endereco.logradouro}, ${endereco.numero}, ${endereco.bairro}, ${endereco.cidade} - ${endereco.estado}` : 'Endereço não informado'}
                </p>
                <p className={styles.texto}>CEP: {endereco ? endereco.cep : '00000-000'}</p>
            </div>
            <div className={styles.contEndereco}>
                <p>{usuario.email || 'Email não informado'}</p>
                <p>CPF: {maskCPF(usuario.cpf)}</p>
            </div>
            <section className={styles.especEntrega}>
                <p>Expectativa de entrega</p>
                <p>{calcularDataEntrega()}</p>
            </section>
        </div>
    );
};
