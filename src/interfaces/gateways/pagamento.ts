import { Transacao } from "../../entities";

export interface IPagamentoGateway {
	gerarPagamento(transacao: Transacao): Promise<object>;
}
