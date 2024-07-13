import { Pedido } from "../../entities/pedido"
import { PedidoProdutos } from "../../types/pedido-produtos"

export interface IPedidoGateway {
  buscarPedidos(): Promise<PedidoProdutos[]>
  criar (pedido: Omit<Pedido, 'id'>): Promise<Pedido>
}
