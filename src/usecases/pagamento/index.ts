import { PagamentoStatus, Pedido } from "../../entities";
import { TransacaoGateway } from "../../gateways";

export class PagamentoUseCase {

	constructor(
        private readonly transacaoGateway: TransacaoGateway,
    ) { }

	async gerarPagamento(pedido: Pedido): Promise<string> {
        const transacao = await this.transacaoGateway.criar({
            pedido: pedido,
            valor: pedido.total,
            pagamentoStatus: new PagamentoStatus('Pendente')
        });
		return transacao.id;
	}
}
