import { Cliente } from "../entities/cliente"
import { Produto } from "../entities/produto"
import { Status } from "../entities/status"

export type PedidoProdutos = {
  cliente: Cliente
  produtos: {
    produto: Produto
    quantidade: number
  }[]
  status: Status
  total: number
  senha: string
}
