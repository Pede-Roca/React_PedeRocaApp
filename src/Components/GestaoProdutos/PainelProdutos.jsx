import React, { useEffect, useState } from 'react';
import styles from './PainelProdutos.module.css';
import ProdutosTop10 from './ProdutosTop10';
import GestaoCategoria from './Categorias/Categorias';
import GestaoProdutos from './GestaoProdutos';
import caixa from '../../assets/Caixas.jpg';
import Sacola from '../../assets/SacolaLegumes.jpg';
import { buscarProdutosSemEstoqueNoBackend } from '../../services';

const PainelProdutos = () => {
    const [renderPainel, setRenderPainel] = useState(true);
    const [renderGerenciarProdutos, setRenderGerenciarProdutos] = useState(false);
    const [renderCategoria, setRenderCategoria] = useState(false);
    const [renderTop10, setRenderTop10] = useState(false);

    const [produtosSemEstoque, setProdutosSemEstoque] = useState([]);

    const fetchProdutosSemEstoque = async () => {
        try {
            const produtosSemEstoqueResult = await buscarProdutosSemEstoqueNoBackend();
            setProdutosSemEstoque(produtosSemEstoqueResult);
        } catch (error) {
            console.error("Erro ao buscar produtos sem estoque:", error);
        }
    };

    // Function to handle "Gerenciar Produtos" button click
    const GerenciarProdutosRender = () => {
        setRenderPainel(false);
        setRenderGerenciarProdutos(true);
        setRenderCategoria(false);
        setRenderTop10(false);
    };

    const GerenciarCategoriaRender = () => {
        setRenderPainel(false);
        setRenderGerenciarProdutos(false);
        setRenderCategoria(true);
        setRenderTop10(false);
    }

    const GerenciarTop10Render = () => {
        setRenderPainel(false);
        setRenderGerenciarProdutos(false);
        setRenderCategoria(false);
        setRenderTop10(true);
    }

    useEffect(() => {
        fetchProdutosSemEstoque();
    }, []);

    return (
        <>
            {renderPainel && (
                <>
                    <section className={styles.ContainerSection}>
                        <div className={styles.Colunas}>
                            <h5>Gerenciar produtos</h5>
                            <p className={styles.EstiloTexto}>Adicionar novos produtos, alterar o status, verificar stock, atribuir categoria, definir desconto e alterar preço de venda.</p>
                        </div>
                        <button className={styles.ButtonAcesso} onClick={GerenciarProdutosRender}>
                            Acessar
                        </button>
                        <img className={styles.ImgSacola} src={Sacola} alt="Sacola de legumes" />
                    </section>
                    <section className={styles.ContainerSection}>
                        <img className={styles.ImgCaixa} src={caixa} alt="Sacola de legumes" />
                        <button className={styles.ButtonAcesso} onClick={GerenciarCategoriaRender}>
                            Acessar
                        </button>
                        <div className={styles.Colunas}>
                            <h5>Gerenciar Categorias</h5>
                            <p className={styles.EstiloTexto}>Adicione, exclua, edite e visualize as categorias de produtos</p>
                        </div>
                    </section>
                    <div className={styles.grupoMiniCont}>
                        <section className={styles.MiniContainerSection}>
                            <h5 className={styles.tituloMiniCont}>Top 10 Vendidos</h5>
                            <p className={styles.MiniEstiloTexto}>Acesse a lista de produtos mais endidos da plataforma</p>
                            <div className={styles.CenterButton}>
                                <button className={styles.buttonAcessoMini} onClick={GerenciarTop10Render}>
                                    Acessar
                                </button>
                            </div>
                        </section>
                        <section className={styles.MiniContainerSection}>
                            <h5 className={styles.tituloMiniCont}>Alerta de Estoque</h5>
                            <div className='d-flex justify-content-space-between align-items-center wrap'>
                                <p className={styles.MiniEstiloTexto}><i className={`bi bi-exclamation-octagon ${styles.iconeAlerta}`}></i></p>
                                <p className={styles.MiniEstiloTexto}>Atenção!! No momento estamos com falta de estoque em "{produtosSemEstoque.length}" Produtos</p>
                            </div>
                        </section>
                    </div>

                </>
            )}
            {renderGerenciarProdutos && <GestaoProdutos />}
            {renderCategoria && <GestaoCategoria />}
            {renderTop10 && <ProdutosTop10 />}
        </>
    );
};

export default PainelProdutos;
