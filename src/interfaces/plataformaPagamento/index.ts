import { Transacao } from "../../entities";

export interface IPlataformaPagamento {
	executarTransacao(transacao: Transacao): Promise<{ idTransacaoExterna: string, qrCode: string }>;
}
