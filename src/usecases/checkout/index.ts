import { Cliente } from "../../entities/cliente";
import { Produto } from "../../entities/produto";
import { Status } from "../../entities/status";
import { ClienteGateway } from "../../gateways";
import { ProdutoGateway } from "../../gateways/produto";
import { CPF } from "../../value-objects/cpf";
import { PedidoUseCase } from "../pedido";

export class CheckoutUseCase {
    // private _cliente: Cliente | undefined;

    constructor(
        private readonly pedidoUseCase: PedidoUseCase,
        private readonly produtoGateway: ProdutoGateway,
        private readonly clienteGateway: ClienteGateway
    ) { }

    async checkout({ produtos, cpf }: { produtos: { id: string, quantidade: number }[], cpf: string }): Promise<string> {
        let cliente;
        if (cpf) {
            const clienteEncontrado = await this.clienteGateway.buscarCliente({ cpf: new CPF(cpf) });
            if (!clienteEncontrado) {
                throw new Error('Cliente não encontrado')
            }
            cliente = new Cliente(clienteEncontrado.id, clienteEncontrado.nome, clienteEncontrado.email, clienteEncontrado.cpf)
        }

        const produtosPedido = await this._formatarProdutosPedido(produtos)
        const totalPedido = this._calcularTotalPedido(produtosPedido)

        const pedidoCriado = await this.pedidoUseCase.criar({
            cliente,
            produtos: produtosPedido,
            total: totalPedido,
            status: new Status('Recebido'),
            senha: String(Math.floor(Math.random() * 10000)).padStart(4, '0'),
        })

        // TO DO: Processar pagamento
        // TO DO: Atualizar status do pagamento do pedido

        return pedidoCriado.senha
    }

    private async _formatarProdutosPedido(produtos: { id: string, quantidade: number }[]): Promise<{ produto: Produto, quantidade: number }[]> {
        const produtosPromises = produtos.map(async ({ id, quantidade }) => {
            const produto = await this.produtoGateway.buscarProdutoPorId(id);
            if (!produto) {
                throw new Error('Produto não encontrado')
            }
            return { produto: new Produto(produto.id, produto.categoria, produto.nome, produto.preco, produto.descricao), quantidade }
        });

        return Promise.all(produtosPromises);
    }

    private _calcularTotalPedido(produtosPedido: { produto: Produto, quantidade: number }[]): number {
        return produtosPedido.reduce((totalPedido, { produto, quantidade }) => totalPedido + (produto.preco * quantidade), 0);
    }
}
