import { Cliente } from "../entities/cliente"
import { PagamentoStatus } from "../entities/pagamentoStatus"
import { Produto } from "../entities/produto"
import { Status } from "../entities/status"

export type PedidoProdutos = {
  cliente: Cliente | null
  produtos: {
    produto: Produto
    quantidade: number
  }[]
  status: Status
  total: number
  senha: string
  pagamentoStatus: PagamentoStatus
}
