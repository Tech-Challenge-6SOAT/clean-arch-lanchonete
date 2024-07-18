import { Cliente } from "../../entities/cliente";
import { Produto } from "../../entities/produto";
import { Status } from "../../entities/status";
import { ClienteGateway } from "../../gateways";
import { ProdutoGateway } from "../../gateways/produto";
import { CPF } from "../../value-objects/cpf";
import { PedidoUseCase } from "../pedido";

export class CheckoutUseCase {

    constructor(
        private readonly pedidoUseCase: PedidoUseCase,
        private readonly produtoGateway: ProdutoGateway,
        private readonly clienteGateway: ClienteGateway
    ) { }

    async checkout({ produtos, cpf }: { produtos: { id: string, quantidade: number }[], cpf: string }): Promise<string> {
        const clienteEncontrado = await this.clienteGateway.buscarCliente({ cpf: new CPF(cpf) });
        if (!clienteEncontrado) {
            throw new Error('Cliente não encontrado')
        }
        const cliente = new Cliente(clienteEncontrado.id, clienteEncontrado.nome, clienteEncontrado.email, clienteEncontrado.cpf)
        const { produtosPedido, totalPedido } = await this._calcularTotalPedido(produtos)

        const produtosCriados = produtosPedido.map(({ produto, quantidade }) => {
            return { produto: new Produto(produto.id, produto.categoria, produto.nome, produto.preco, produto.descricao), quantidade }
        })

        const pedidoCriado = await this.pedidoUseCase.criar({
            cliente,
            produtos: produtosCriados,
            total: totalPedido,
            status: new Status('Recebido'),
            senha: String(Math.floor(Math.random() * 10000)),
        })

        return pedidoCriado.senha
    }

    private async _calcularTotalPedido(produtos: { id: string, quantidade: number }[]): Promise<
    {
        produtosPedido: { produto: Produto, total: number, quantidade: number }[],
        totalPedido: number
    }> {
        const promises = produtos.map(async ({ id, quantidade }) => {
            const produto = await this.produtoGateway.buscarProdutoPorId(id);
            if (!produto) {
                throw new Error('Produto não encontrado')
            }
            const total = produto.preco * quantidade
            return { produto, total, quantidade };
        });

        const produtosPedido = await Promise.all(promises);
        const totalPedido = produtosPedido.reduce((t, { total }) => t + total, 0);

        return { produtosPedido, totalPedido }
    }
}
