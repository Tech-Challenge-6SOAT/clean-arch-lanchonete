import { PagamentoStatus, Pedido } from "../../entities";
import { TransacaoGateway, PagamentoGateway } from "../../gateways";

export class PagamentoUseCase {

    constructor(
        private readonly transacaoGateway: TransacaoGateway,
        private readonly pagamentoGateway: PagamentoGateway
    ) { }

    async gerarPagamento(pedido: Pedido): Promise<string> {
        const transacao = await this.transacaoGateway.criar({
            pedido: pedido,
            valor: pedido.total,
            pagamentoStatus: new PagamentoStatus('Pendente')
        });

        const output = await this.pagamentoGateway.gerarPagamento(transacao);
        await this.transacaoGateway.editar({id: transacao.id, value: { idTransacaoExterna: output.idTransacaoExterna }});
        return output.qrCode;
    }
}
