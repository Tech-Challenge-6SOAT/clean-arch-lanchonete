import { PedidoGateway } from "../../gateways/pedido";
import { PedidoProdutos } from "../../types/pedido-produtos";

export class PedidoUseCase {

    constructor(private readonly pedidoGateway: PedidoGateway) { }

    async buscarPedidos(): Promise<PedidoProdutos[]> {
        return this.pedidoGateway.buscarPedidos()
    }
}
