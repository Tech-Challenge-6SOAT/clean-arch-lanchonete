import { Cliente } from "./cliente";
import { Produto } from "./produto";
import { Status } from "./status";

export class Pedido {
  constructor (
    private readonly _cliente: Cliente,
    private readonly _produtos: Produto[],
    private readonly _status: Status,
    private readonly _total: number,
    private readonly _senha: string
  ) {}

  get cliente(): Cliente {
    return this._cliente
  }

  get produtos(): Produto[] {
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
