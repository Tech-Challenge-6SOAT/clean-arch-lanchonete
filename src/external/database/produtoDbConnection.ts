import { DbConnection } from "../../interfaces/db/connection";
import { ProdutoModel } from "./mongodb/models";

export class ProdutoDbConnection implements DbConnection {
  async criar<T = any>(params: Object): Promise<T> {
    const produto = new ProdutoModel(params);
    await produto.save();
    return { _id: produto._id } as T
  }

  async buscar<T = any>(params: Object): Promise<T[]> {
    return ProdutoModel.find(params)
  }

  async excluir(id: string): Promise<void> {
    await ProdutoModel.findByIdAndDelete({ _id: id });
  }

  async buscarUm<T = any>(params: Object): Promise<T | null> {
    return ProdutoModel.findOne(params)
  }

  async buscarEmConjuntoCom<T = any>(params: Object, juntarCom: string): Promise<T[]> {
    return []
  }

  async editar<T = any>(params: { id: string, filter: object }): Promise<T | null> {
    const { id, filter } = params
    return ProdutoModel.findByIdAndUpdate(id, filter, { new: true })
  }
}
