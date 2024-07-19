import { DbConnection } from "../../interfaces/db/connection";
import { PedidoModel } from "./mongodb/models";

export class PedidoDbConnection implements DbConnection {
  async criar<T = any>(params: Object): Promise<T> {
    const pedido = new PedidoModel(params);
    await pedido.save();
    return { _id: pedido._id } as T
  }

  async buscar<T = any>(params: Object): Promise<T[]> {
    const pipeline = [
      {
        $match: {
          category: { $ne: 'Finalizado' },
        },
      },
      {
        $lookup: {
          from: 'clientes',
          localField: 'cliente',
          foreignField: '_id',
          as: 'cliente',
        },
      },
      {
        $unwind: {
          path: '$cliente',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'produtos',
          localField: 'produtos.produto',
          foreignField: '_id',
          as: 'produtos',
        },
      },
      {
        $addFields: {
          statusCustomOrder: {
            $switch: {
              branches: [
                { case: { $eq: ['$status', 'Pronto'] }, then: 0 },
                { case: { $eq: ['$status', 'Em Preparação'] }, then: 1 },
              ],
              default: 2,
            },
          },
        },
      },
      { $sort: { statusCustomOrder: 1, createdAt: 1 } },
    ];

    return PedidoModel.aggregate(pipeline as []);
  }

  async excluir(id: string): Promise<void> {
    await PedidoModel.findByIdAndDelete({ _id: id });
  }

  async buscarUm<T = any>(params: Object): Promise<T | null> {
    return PedidoModel.findOne(params)
  }

  async buscarEmConjuntoCom<T = any>(params: Object, juntarCom: string): Promise<T[]> {
    return []
  }

  async editar<T = any>(params: { id: string, filter: object }): Promise<T | null> {
    const { id, filter } = params
    return PedidoModel.findByIdAndUpdate(id, filter, { new: true })
  }
}
