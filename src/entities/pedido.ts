import { Cliente } from "./cliente";
import { Produto } from "./produto";
import { Status } from "./status";

export class Pedido {
  constructor(
    private readonly _id: string,
    private readonly _cliente: Cliente | undefined,
    private readonly _produtos: { produto: Produto, quantidade: number }[],
    private readonly _status: Status,
    private readonly _total: number,
    private readonly _senha: string
  ) { }

  get id(): string {
    return this._id
  }

  get cliente(): Cliente | undefined {
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
}
