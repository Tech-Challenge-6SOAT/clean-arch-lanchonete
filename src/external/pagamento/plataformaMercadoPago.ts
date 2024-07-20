import { Transacao } from "../../entities"
import { IPlataformaPagamento } from "../../interfaces/plataformaPagamento";

export class PlataformaMercadoPago implements IPlataformaPagamento {
    async executarTransacao(transacao: Transacao): Promise<{ idTransacaoExterna: string, qrCode: string }> {
        return {
            idTransacaoExterna: '',
            qrCode:''
        }
    }
}
