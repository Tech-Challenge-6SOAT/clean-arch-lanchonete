import { Pedido } from "../entities/pedido";
import { DbConnection } from "../interfaces/db/connection";
import { IPedidoGateway } from "../interfaces/gateways/pedido";
import { PedidoProdutos } from "../types/pedido-produtos";

export class PedidoGateway implements IPedidoGateway {
  constructor(private readonly dbConnection: DbConnection) { }

  async buscarPedidos(): Promise<PedidoProdutos[]> {
    const pedidos = await this.dbConnection.buscar<Pedido>({});

    return pedidos.map((pedido) => ({
      cliente: pedido.cliente,
      produtos: pedido.produtos,
      status: pedido.status,
      total: pedido.total,
      senha: pedido.senha,
      pagamentoStatus: pedido.pagamentoStatus
    }));
  }

  async buscarPedido(id: string): Promise<PedidoProdutos | null> {
    const pedido = await this.dbConnection.buscarUm<Pedido>({ _id: id});
    if (!pedido) return null;
    return {
      cliente: pedido.cliente,
      produtos: pedido.produtos,
      status: pedido.status,
      total: pedido.total,
      senha: pedido.senha,
      pagamentoStatus: pedido.pagamentoStatus
    };
  }

  async criar(pedido: Omit<Pedido, "id">): Promise<Pedido> {
    const produtoCriado = await this.dbConnection.criar<{ _id: string }>(
      {...pedido, status: pedido.status.status, pagamentoStatus: pedido.pagamentoStatus.status},
    );
    return new Pedido(
      produtoCriado._id,
      pedido.cliente,
      pedido.produtos,
      pedido.status,
      pedido.total,
      pedido.senha,
      pedido.pagamentoStatus
    );
  }

  async editar(params: { id: string; filter: object }): Promise<Pedido | null> {
    const produtoAtualizado = await this.dbConnection.editar<Pedido>(params);
    if (!produtoAtualizado) return null;
    return new Pedido(
      produtoAtualizado.id,
      produtoAtualizado.cliente,
      produtoAtualizado.produtos,
      produtoAtualizado.status,
      produtoAtualizado.total,
      produtoAtualizado.senha,
      produtoAtualizado.pagamentoStatus
    );
  }
}
