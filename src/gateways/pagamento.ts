import { Pedido } from "../entities";
import { IPagamentoGateway } from "../interfaces/gateways/pagamento";
import { IPlataformaPagamento } from "../interfaces/plataformaPagamento";

export class PagamentoGateway implements IPagamentoGateway {
  constructor(private readonly plataformaPagamento: IPlataformaPagamento) { }

  async gerarPagamento(pedido: Pedido): Promise<{ idTransacaoExterna: string, qrCode: string }> {
    return this.plataformaPagamento.executarTransacao(pedido);
  }
}
