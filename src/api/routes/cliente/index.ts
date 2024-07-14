import { FastifyInstance } from "fastify";
import { ClienteController } from "../../../controllers/cliente";
import { ClienteGateway } from "../../../gateways/cliente";
import { FakeDb } from "../../../external/fake-db";
import { ClienteUseCase } from "../../../usecases/cliente";

export const clienteRoutes = async (app: FastifyInstance) => {
  const dbConnection = new FakeDb()
  const clienteGateway = new ClienteGateway(dbConnection)
  const clienteUseCase = new ClienteUseCase(clienteGateway)
  const clienteController = new ClienteController(clienteUseCase)

  app.post('/cliente', {}, async function (request, reply) {
    const response = await clienteController.criar(request)
    return reply.status(response.statusCode).send(response.data)
  })
}
