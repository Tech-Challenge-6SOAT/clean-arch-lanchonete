import { Pedido } from "../../entities";

export interface IPagamentoGateway {
	gerarPagamento(pedido: Pedido): Promise<object>;
}
