import axios from "axios";
import { criarProdutoPedidoNoBackend, capturarIdDoUsuarioESetarNoLocalStorage } from "../services";

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

// Captura ou cria o ID do carrinho de compra
const capturaIdDoCarrinho = async () => {
    const backendId = await capturarIdDoUsuarioESetarNoLocalStorage();
    const carrinhoExistente = await buscarCarrinhoDeCompraPeloIdDoUsuarioNoBackend(backendId);

    if (!carrinhoExistente) {
        const novoCarrinho = await criarCarrinhoDeCompraNoBackend(backendId);
        return novoCarrinho || null;
    }

    return carrinhoExistente;
};

// Cria um novo carrinho de compra no backend
export const criarCarrinhoDeCompraNoBackend = async (idUsuario) => {
    const { data, erro } = await realizarRequisicao("post", `${import.meta.env.VITE_API_URL}carrinho-compra`, { idUsuario });
    return erro ? null : data.id;
};

// Busca o carrinho de compra pelo ID do usuário no backend
export const buscarCarrinhoDeCompraPeloIdDoUsuarioNoBackend = async (idUsuario) => {
    const { data, erro } = await realizarRequisicao("get", `${import.meta.env.VITE_API_URL}carrinho-compra/buscar-por-id-usuario/${idUsuario}`);
    return erro ? null : data.id;
};

// Busca o Historico de compra pelo ID
export const buscarHistoricoDeCompraPorId = async () => {
    const backendId = await capturarIdDoUsuarioESetarNoLocalStorage();
    const { data, erro } = await realizarRequisicao("get", `${import.meta.env.VITE_API_URL}carrinho-compra/buscar-historico-por-id-usuario/${backendId}`);
    return erro ? [] : data;
};

// Adiciona um produto ao carrinho de compra
export const adicionarProdutoNoCarrinho = async (quantidade, idProduto) => {
    try {
        const idCarrinho = await capturaIdDoCarrinho();
        if (!idCarrinho) throw new Error("Erro ao obter o ID do carrinho");

        const produtoPedido = await criarProdutoPedidoNoBackend(quantidade, idProduto);
        const { data } = await realizarRequisicao("post", `${import.meta.env.VITE_API_URL}carrinho-compra/adicionar-no-carrinho`, {
            idCarrinhoCompra: idCarrinho,
            idProdutosPedido: produtoPedido.id
        });

        return { status: true, message: data.message };
    } catch (error) {
        return { status: false, message: "Erro ao adicionar produto no carrinho" };
    }
};

// Busca os itens do carrinho de compra pelo ID do usuário no backend
export const buscarItensDoCarrinhoPorUsuarioNoBackend = async () => {
    try {
        const idCarrinhoCompra = await capturaIdDoCarrinho();
        if (!idCarrinhoCompra) throw new Error("Erro ao obter o ID do carrinho");

        const idUsuario = await capturarIdDoUsuarioESetarNoLocalStorage();
        const { data } = await realizarRequisicao("get", `${import.meta.env.VITE_API_URL}carrinho-compra/itens-carrinho-por-usuario`, {
            params: {
                idUsuario,
                idCarrinhoCompra
            }
        });

        return data || [];
    } catch (error) {
        return { status: false, message: "Erro ao buscar itens do carrinho" };
    }
};

// Remove um produto do carrinho de compra no backend
export const removerProdutoDoCarrinhoNoBackend = async (idProdutoPedido) => {
    const idCarrinhoCompra = await capturaIdDoCarrinho();

    const { data, erro } = await realizarRequisicao("post", `${import.meta.env.VITE_API_URL}carrinho-compra/remover-produto-carrinho`, {
        idCarrinhoCompra,
        idProdutoPedido
    });

    return erro
        ? { status: false, message: "Erro ao remover produto do carrinho" }
        : { status: true, message: data.message };
};

export const finalizarCompraNoBackend = async (tipoEntrega, tipoPagamento, idEndereco) => {
    try {
        const idCarrinhoCompra = await capturaIdDoCarrinho();

        console.log(tipoEntrega, tipoPagamento, idEndereco, idCarrinhoCompra)
        console.log(`${import.meta.env.VITE_API_URL}carrinho-compra/finalizar-compra`)

        const { data } = await realizarRequisicao("post", `${import.meta.env.VITE_API_URL}carrinho-compra/finalizar-compra`, {
            tipoEntrega,
            tipoPagamento,
            idEndereco,
            idCarrinhoCompra
        })
        // console.log(data);
        // return { status: true, message: data.message };

        return { status: true, message: "Compra finalizada com sucesso" };
    } catch (error) {
        return { status: false, message: "Erro ao finalizar a compra" };
    }
};

const criarProdutoPedidoParaRecompra = async (quantidadeProduto, idProduto) => {
    const { data, erro } = await realizarRequisicao("post", `${import.meta.env.VITE_API_URL}produto-pedido`, {
        quantidadeProduto, idProduto
    })

    return erro ? erro : data
}

const adicionarProdutosAoCarrinhoDeCompraParaRecompra = async (lista_id_produtos_pedidos) => {
    try {
        const idCarrinhoCompra = await capturaIdDoCarrinho();
        
        // Verificar se o carrinho foi encontrado
        if (!idCarrinhoCompra) {
            throw new Error('Erro: Carrinho de compra não encontrado');
        }

        const resultados = [];

        // Iterar sobre a lista de produtos e adicionar cada um ao carrinho
        for (const id of lista_id_produtos_pedidos) {
            const { data, erro } = await realizarRequisicao("post", `${import.meta.env.VITE_API_URL}carrinho-compra/adicionar-no-carrinho`, {
                idCarrinhoCompra, 
                idProdutosPedido: id
            });

            if (erro) {
                // Adicionar ao array de resultados caso haja erro
                resultados.push({ idProduto: id, sucesso: false, erro });
            } else {
                // Caso a requisição tenha sido bem-sucedida
                resultados.push({ idProduto: id, sucesso: true, data });
            }
        }

        // Retornar os resultados para análise posterior
        return resultados;
    } catch (error) {
        console.error('Erro ao adicionar produtos ao carrinho:', error.message);
        return { status: false, message: `Erro geral: ${error.message}` };
    }
};


// Logica para recompra
export const recomprarProdutosNoFront = async (carrinho) => {
    try {
        const idCarrinhoCompra = carrinho.idCarrinhoCompra;
        const idUsuario = await capturarIdDoUsuarioESetarNoLocalStorage();

        // Verificar se as informações essenciais estão presentes
        if (!idCarrinhoCompra || !idUsuario) {
            throw new Error("Erro ao obter as informações essenciais: idCarrinhoCompra ou idUsuario não encontrados");
        }

        // Realizar a requisição para buscar os itens no carrinho
        const { data: itens_carrinho, erro } = await realizarRequisicao("get", `${import.meta.env.VITE_API_URL}carrinho-compra/itens-carrinho-por-usuario`, {
            params: {
                idUsuario,
                idCarrinhoCompra
            }
        });

        // Verificar se ocorreu algum erro na requisição
        if (erro) throw new Error("Erro ao buscar itens do carrinho");

        let produtosSemEstoque = [];

        // Verificar estoque para cada item
        if (Array.isArray(itens_carrinho)) for (const item of itens_carrinho) { if (item.estoque < item.quantidade) { produtosSemEstoque.push(item); } }

        // Se houver produtos sem estoque, retornar a mensagem de erro
        if (produtosSemEstoque.length) {
            console.log(produtosSemEstoque)
            return { status: false, message: "Os seguintes produtos não têm estoque suficiente para compra", data: produtosSemEstoque };
        }

        let lista_id_produtos_pedidos = []

        for (const produto of itens_carrinho) {
            const { id } = await criarProdutoPedidoParaRecompra(produto.quantidade, produto.idProduto)
            lista_id_produtos_pedidos.push(id)
        }

        let resultados = await adicionarProdutosAoCarrinhoDeCompraParaRecompra(lista_id_produtos_pedidos);

        // Se todos os produtos têm estoque suficiente
        return resultados.every(item => item.sucesso)
            ? { status: true, message: "Produtos adicionados ao carrinho para recompra com sucesso!" }
            : { status: false, message: "Houve erro ao adicionar alguns produtos", data: resultados };

    } catch (error) {
        return { status: false, message: `Erro geral: ${error.message}` };
    }
};
