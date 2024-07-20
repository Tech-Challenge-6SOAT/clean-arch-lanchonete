import { randomUUID } from "crypto";
import { Pedido } from "../../entities"
import { IPlataformaPagamento } from "../../interfaces/plataformaPagamento";
import QRCode from 'qrcode'

export class PlataformaPagamentoFake implements IPlataformaPagamento {
    async executarTransacao(pedido: Pedido): Promise<{ idTransacaoExterna: string, qrCode: string }> {
        const qrCode = await QRCode.toDataURL("https://pagamentofake.com.br")
        return { idTransacaoExterna: randomUUID(), qrCode }
    }
}
