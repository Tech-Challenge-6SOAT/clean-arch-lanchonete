import { Categoria } from "../entities/categoria";
import { Cliente } from "../entities/cliente";
import { Pedido } from "../entities/pedido";
import { Produto } from "../entities/produto";
import { Status } from "../entities/status";
import { PedidoDados } from "../types/pedido-dados";
import { CPF } from "../value-objects/cpf";

export interface IClienteGateway {
  buscarCliente(cpf: CPF): Promise<Cliente>
  createCliente(cliente: Omit<Cliente, 'id'>): Promise<Cliente>
}

export interface IProdutoGateway {
  buscarProdutosPorCategoria(categoria: Categoria): Promise<Produto[]>
  buscarProdutoPorId(id: string): Promise<Produto>
  criar(produto: Omit<Produto, 'id'>): Promise<Produto>
  excluir(produto: Produto): Promise<void>
}

interface IPedidoGateway {
  buscarPedidos(): Promise<PedidoDados[]>
  criar (pedido: Omit<Pedido, 'id'>): Promise<Pedido>
}
