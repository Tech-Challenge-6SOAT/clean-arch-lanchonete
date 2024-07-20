import { PedidoModel } from "../models";
import { MongoDbConnection } from "./db-connections";

export class PedidoDbConnection extends MongoDbConnection {
  constructor () {
    super(PedidoModel)
  }

  async buscar<T = any>(_params: Object): Promise<T[]> {
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
        $lookup: {
          from: 'transacoes',
          localField: 'transacao',
          foreignField: '_id',
          as: 'transacao',
        },
      },
      {
        $unwind: {
          path: '$transacao',
          preserveNullAndEmptyArrays: true
        }
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
}
