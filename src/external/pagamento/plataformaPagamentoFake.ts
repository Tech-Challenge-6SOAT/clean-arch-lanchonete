import { randomUUID } from "crypto";
import { Transacao } from "../../entities"
import { IPlataformaPagamento } from "../../interfaces/plataformaPagamento";
import QRCode from 'qrcode'

export class PlataformaPagamentoFake implements IPlataformaPagamento {
    async executarTransacao(transacao: Transacao): Promise<{ idTransacaoExterna: string, qrCode: string }> {        
        return {
            idTransacaoExterna: randomUUID(),
            qrCode: QRCode.toDataURL("https://pagamentofake.com.br") as unknown as string
        }
    }
}
