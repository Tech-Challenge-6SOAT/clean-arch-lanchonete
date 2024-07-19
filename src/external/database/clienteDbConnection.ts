import { DbConnection } from "../../interfaces/db/connection";
import { ClienteModel } from "./mongodb/models";

export class ClienteDbConnection implements DbConnection {
  async criar<T = any>(params: Object): Promise<T> {
    const cliente = new ClienteModel(params);
    await cliente.save();
    return { _id: cliente._id } as T
  }

  async buscar<T = any>(params: Object): Promise<T[]> {
    return ClienteModel.find(params)
  }

  async excluir(id: string): Promise<void> {
    await ClienteModel.findByIdAndDelete({ _id: id });
  }

  async buscarUm<T = any>(params: Object): Promise<T | null> {
    return ClienteModel.findOne(params)
  }

  async buscarEmConjuntoCom<T = any>(params: Object, juntarCom: string): Promise<T[]> {
    return []
  }

  async editar<T = any>(params: { id: string, filter: object }): Promise<T | null> {
    const { id, filter } = params
    return ClienteModel.findByIdAndUpdate(id, filter, { new: true })
  }
}
