import { Pedido } from "../../entities/pedido";
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
}
