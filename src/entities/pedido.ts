import { Cliente } from "./cliente";
import { PagamentoStatus } from "./pagamentoStatus";
import { Produto } from "./produto";
import { Status } from "./status";

export class Pedido {
  constructor(
    private readonly _id: string,
    private readonly _cliente: Cliente | null,
    private readonly _produtos: { produto: Produto, quantidade: number }[],
    private readonly _status: Status,
    private readonly _total: number,
    private readonly _senha: string,
    private readonly _pagamentoStatus: PagamentoStatus
  ) { }

  get id(): string {
    return this._id
  }

  get cliente(): Cliente | null {
    return this._cliente
  }

  get produtos(): { produto: Produto, quantidade: number }[] {
    return this._produtos
  }

  get status(): Status {
    return this._status
  }

  get total(): number {
    return this._total
  }

  get senha(): string {
    return this._senha
  }

  get pagamentoStatus(): PagamentoStatus {
    return this._pagamentoStatus
  }
}
