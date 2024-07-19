import { DbConnection } from "../../interfaces/db/connection";
import { PedidoModel } from "./mongodb/models";

export class PedidoDb implements DbConnection {
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

    return PedidoModel.aggregate(pipeline);
  }

  async excluir(id: string): Promise<void> { }

  async buscarUm<T = any>(params: Object): Promise<T | null> {
    return null
  }

  async buscarEmConjuntoCom<T = any>(params: Object, juntarCom: string): Promise<T[]> {
    return []
  }

  async editar<T = any>(params: Object): Promise<T> {
    return {
      _id: 'any id',
      ...params
    } as T
  }
}
