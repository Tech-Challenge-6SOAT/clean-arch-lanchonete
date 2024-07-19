import { DbConnection } from "../../interfaces/db/connection";
import { ClienteModel } from "./mongodb/models";

export class ClienteDb implements DbConnection {
  async criar<T = any>(params: Object): Promise<T> {
    const cliente = new ClienteModel(params);
    await cliente.save();
    return { _id: cliente._id } as T
  }

  async buscar<T = any>(params: Object): Promise<T[]> {
    return []
  }

  async excluir(id: string): Promise<void> { }

  async buscarUm<T = any>(params: Object): Promise<T | null> {
    return ClienteModel.findOne(params)
  }

  async buscarEmConjuntoCom<T = any>(params: Object, juntarCom: string): Promise<T[]> {
    return []
  }

  async editar<T = any>(params: Object): Promise<T | null> {
    return {
      _id: 'any id',
      ...params
    } as T
  }

}
