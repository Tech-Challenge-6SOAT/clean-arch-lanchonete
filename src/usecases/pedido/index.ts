import { Pedido } from "../../entities/pedido";
import { Status } from "../../entities/status";
import { PedidoGateway } from "../../gateways/pedido";
import { PedidoProdutos } from "../../types/pedido-produtos";

export class PedidoUseCase {

    constructor(private readonly pedidoGateway: PedidoGateway) { }

    async buscarPedidos(): Promise<PedidoProdutos[]> {
        return this.pedidoGateway.buscarPedidos()
    }

    async criar({ cliente, produtos, total, status, senha }: Omit<Pedido, "id">): Promise<Pedido> {
        return this.pedidoGateway.criar({
            cliente,
            produtos,
            total,
            status,
            senha,
        })
    }

    async atualizarStatusPedido(params: { id: string, status: Status }): Promise<PedidoProdutos | null> {
        const pedido = await this.pedidoGateway.buscarPedido(params.id)
        if (!pedido) {
            throw new Error('Pedido não encontrado')
        }

        return this.pedidoGateway.editar(params)
    }

    async statusPagamento(id: string): Promise<string> {
        const statusPagamento = "Aprovado"; // Recusado // Pendente   
        return statusPagamento
    }
}
