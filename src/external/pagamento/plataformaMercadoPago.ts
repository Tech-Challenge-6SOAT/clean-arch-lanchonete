import { Pedido } from "../../entities"
import { IPlataformaPagamento } from "../../interfaces/plataformaPagamento";

export class PlataformaMercadoPago implements IPlataformaPagamento {
    async executarTransacao(pedido: Pedido): Promise<{ idTransacaoExterna: string, qrCode: string }> {
        return {
            idTransacaoExterna: '',
            qrCode:''
        }
    }

    converterMensagemWebhook(mensagem: { id: string, status: string }): { idTransacaoExterna: string; pagamentoStatus: string } {
        const STATUS: Record<string, string> = {
            'paid': 'Aprovado',
            'refused': 'Recusado',
            'payment_required': 'Pendente',
        };
        return { idTransacaoExterna: mensagem.id, pagamentoStatus: STATUS[mensagem.status] }
    }
}
