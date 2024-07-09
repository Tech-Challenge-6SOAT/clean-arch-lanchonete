import { CPF } from "../value-objects/cpf"
import { Email } from "../value-objects/email"

export class Cliente {
  constructor (
    private readonly _id: string,
    private readonly _email: Email,
    private readonly _cpf: CPF,
    private readonly _nome: string
  ) {}

  get id(): string {
    return this._id
  }

  get email(): Email {
    return this._email
  }

  get cpf(): CPF {
    return this._cpf
  }

  get nome(): string {
    return this._nome
  }
}
