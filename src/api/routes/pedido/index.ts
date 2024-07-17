import { FastifyInstance } from "fastify";
import { PedidoController } from "../../../controllers/pedido";
import { PedidoGateway } from "../../../gateways/pedido";
import { FakeDb } from "../../../external/fake-db";
import { PedidoUseCase } from "../../../usecases/pedido";

export const pedidoRoutes = async (app: FastifyInstance) => {
  const dbConnection = new FakeDb()
  const pedioGateway = new PedidoGateway(dbConnection)
  const pedidoUseCase = new PedidoUseCase(pedioGateway)
  const pedidoController = new PedidoController(pedidoUseCase)

  app.get('/pedidos', {}, async function (request, reply) {
    const response = await pedidoController.buscarPedidos(request)
    return reply.status(response.statusCode).send(response.data)
  })
}
