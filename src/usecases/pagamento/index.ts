import { PagamentoStatus, Pedido } from "../../entities";
import { TransacaoGateway, PagamentoGateway } from "../../gateways";

export class PagamentoUseCase {

    constructor(
        private readonly transacaoGateway: TransacaoGateway,
        private readonly pagamentoGateway: PagamentoGateway
    ) { }

    async gerarPagamento(pedido: Pedido): Promise<string> {
        const output = await this.pagamentoGateway.gerarPagamento(pedido);

        await this.transacaoGateway.criar({
            pedido: pedido,
            valor: pedido.total,
            pagamentoStatus: new PagamentoStatus('Pendente'),
            idTransacaoExterna: output.idTransacaoExterna
        });

        return output.qrCode;
    }
}
