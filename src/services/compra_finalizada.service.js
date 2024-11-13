import axios from "axios";
import { capturarIdDoUsuarioESetarNoLocalStorage } from "../services";

// Função auxiliar para lidar com requisições HTTP
const realizarRequisicao = async (metodo, url, dados = {}) => {
    try {
        const response = await axios[metodo](url, dados);
        return { data: response.data, erro: null };
    } catch (error) {
        console.error(`Erro ao realizar requisição: ${error}`);
        return { data: null, erro: error };
    }
};


const buscarItensNoCarrinhoPeloIdDoCarrinhoEDoUsuario = async (idCarrinhoCompra, idUsuario) => {
    const { data, erro } = await realizarRequisicao("get", `${import.meta.env.VITE_API_URL}carrinho-compra/itens-carrinho-por-usuario`, {
        params: {
            idUsuario,
            idCarrinhoCompra
        }
    });

    return erro ? erro : data;
};

const buscarEnderecoDoUsuarioPeloIdDoUsuario = async (idUsuario) => {
    const { data, erro } = await realizarRequisicao("get", `${import.meta.env.VITE_API_URL}endereco/usuario/${idUsuario}`)
    return erro ? erro : data;
}

const buscarDadosDoUsuarioPeloIdDoUsuario = async (idUsuario) => {
    const { data, erro } = await realizarRequisicao("get", `${import.meta.env.VITE_API_URL}usuario/${idUsuario}`)
    return erro ? erro : data;
}

const buscarCarrinhosEmAberto = async () => {
    const { data, erro } = await realizarRequisicao("get", `${import.meta.env.VITE_API_URL}carrinho-compra`)

    if (Array.isArray(data)) {
        for (const carrinho of data) {
            const itensCarrinho = await buscarItensNoCarrinhoPeloIdDoCarrinhoEDoUsuario(carrinho.id, carrinho.idUsuario);
            const usuarioInformacoes = await buscarDadosDoUsuarioPeloIdDoUsuario(carrinho.idUsuario)

            carrinho.itensCarrinho = itensCarrinho;
            carrinho.usuario = {
                nome: usuarioInformacoes.nome,
                dataNasc: usuarioInformacoes.dataNasc,
                email: usuarioInformacoes.email,
                telefone: usuarioInformacoes.telefone, 
            }
        }
    }

    return erro ? erro : data;
}

const buscarCarrinhosEmAbertoParaTodos = async () => {
    const { data, erro } = await realizarRequisicao("get", `${import.meta.env.VITE_API_URL}carrinho-compra`)
    let newData = []

    if (Array.isArray(data)) {
        for (const carrinho of data) {
            const itensCarrinho = await buscarItensNoCarrinhoPeloIdDoCarrinhoEDoUsuario(carrinho.id, carrinho.idUsuario);
            const usuarioInformacoes = await buscarDadosDoUsuarioPeloIdDoUsuario(carrinho.idUsuario)

            newData.push({
                id: null,
                idCarrinho: carrinho.id,
                nomeUsuario: usuarioInformacoes.nome,
                status: 'aberto',
                itensComprados: itensCarrinho
            })
        }
    }

    return erro ? erro : newData;
}

export const buscarComprasFinalizadasNoBackend = async () => {
    const { data, erro } = await realizarRequisicao("get", `${import.meta.env.VITE_API_URL}compras-finalizadas`);
    if (erro) return null;

    if (Array.isArray(data)) {
        let entregasPendentes = [];
        let comprasFinalizadas = [];
        let comprasEmAberto = [];

        for (const compra of data) {
            const itensCarrinho = await buscarItensNoCarrinhoPeloIdDoCarrinhoEDoUsuario(compra.idCarrinhoCompra, compra.idUsuario);
            const enderecoDoUsuario = await buscarEnderecoDoUsuarioPeloIdDoUsuario(compra.idUsuario)
            const usuarioInformacoes = await buscarDadosDoUsuarioPeloIdDoUsuario(compra.idUsuario)
            
            compra.itensCarrinho = itensCarrinho;
            compra.endereco = enderecoDoUsuario;
            compra.usuario = {
                nome: usuarioInformacoes.nome,
                dataNasc: usuarioInformacoes.dataNasc,
                email: usuarioInformacoes.email,
                telefone: usuarioInformacoes.telefone, 
            }

            if (compra.status) entregasPendentes.push(compra);
            else comprasFinalizadas.push(compra);
        }

        comprasEmAberto = await buscarCarrinhosEmAberto();

        return { entregasPendentes, comprasFinalizadas, comprasEmAberto };
    }

    return data;
};

export const buscarComprasFinalizadaParaTodosOsPedidosNoBackend = async () => {
    const { data, erro } = await realizarRequisicao("get", `${import.meta.env.VITE_API_URL}compras-finalizadas`);
    if (erro) return null;

    if (Array.isArray(data)) {
        let entregasPendentes = [];
        let comprasFinalizadas = [];
        let comprasEmAberto = await buscarCarrinhosEmAbertoParaTodos();

        for (const compra of data) {
            const itensCarrinho = await buscarItensNoCarrinhoPeloIdDoCarrinhoEDoUsuario(compra.idCarrinhoCompra, compra.idUsuario);
            const usuarioInformacoes = await buscarDadosDoUsuarioPeloIdDoUsuario(compra.idUsuario)

            if (compra.status) entregasPendentes.push({
                id: compra.id,
                idCarrinho: compra.idCarrinhoCompra,
                nomeUsuario: usuarioInformacoes.nome,
                status: 'entrega',
                itensComprados: itensCarrinho
            });
            else comprasFinalizadas.push({
                id: compra.id,
                idCarrinho: compra.idCarrinhoCompra,
                nomeUsuario: usuarioInformacoes.nome,
                status: 'finalizado',
                itensComprados: itensCarrinho
            });
        }

        return [ ...entregasPendentes, ...comprasFinalizadas, ...comprasEmAberto ];
    }

    return null;
};