import { Transacao } from "../entities/transacao";
import { DbConnection } from "../interfaces/db/connection";
import { ITransacaoGateway } from "../interfaces/gateways/transacao";


export class TransacaoGateway implements ITransacaoGateway {
	constructor(
		private readonly dbConnection: DbConnection
	) { }

	async criar(transacao: Omit<Transacao, "id" | "data">): Promise<Transacao> {
		const transacaoCriada = await this.dbConnection.criar<{ _id: string, createdAt: Date }>(
			{ ...transacao, pagamentoStatus: transacao.pagamentoStatus.status }
		);
		return new Transacao(
			transacaoCriada._id,
			transacao.pedido,
			transacao.valor,
			transacao.pagamentoStatus,
			transacaoCriada.createdAt
		)
	}
}
