import { Pedido } from "../entities/pedido";
import { DbConnection } from "../interfaces/db/connection";
import { IPedidoGateway } from "../interfaces/gateways/pedido";
import { PedidoProdutos } from "../types/pedido-produtos";

export class PedidoGateway implements IPedidoGateway {
  constructor (
    private readonly dbConnection: DbConnection
  ) {}

  async buscarPedidos(): Promise<PedidoProdutos[]> {
    const pedidos = await this.dbConnection.buscar<Pedido>({})

    return pedidos.map(pedido => {
      return {
          cliente: pedido.cliente,
          produtos: pedido.produtos,
          status: pedido.status,
          total: pedido.total,
          senha: pedido.senha
      }
  })
  }

  async criar(pedido: Omit<Pedido, "id">): Promise<Pedido> {
    const produtoCriado = await this.dbConnection.criar<{ _id: string }>(pedido)
    return new Pedido(
      produtoCriado._id,
      pedido.cliente,
      pedido.produtos,
      pedido.status,
      pedido.total,
      pedido.senha
    )
  }
}