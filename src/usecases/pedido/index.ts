import { Pedido } from "../../entities/pedido";
import { StatusEnum } from "../../entities/status";
import { PedidoGateway } from "../../gateways/pedido";
import { PedidoProdutos } from "../../types/pedido-produtos";

export class PedidoUseCase {

    constructor(private readonly pedidoGateway: PedidoGateway) { }

    async buscarPedidos(): Promise<PedidoProdutos[]> {
        return this.pedidoGateway.buscarPedidos()
    }

    async criar({ cliente, produtos, total, status, senha }: Pedido): Promise<Pedido> {
        return this.pedidoGateway.criar({
            cliente,
            produtos,
            total,
            status,
            senha,
        })
    }

    async atualizarStatusPedido(params: { id: string, status: StatusEnum }): Promise<PedidoProdutos> {
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
