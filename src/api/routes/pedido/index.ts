import { FastifyInstance } from "fastify";
import { PedidoController } from "../../../controllers/pedido";
import { ClienteGateway, PedidoGateway, ProdutoGateway } from "../../../gateways";
import { PedidoDb, ProdutoDb, ClienteDb } from "../../../external/database";
import { PedidoUseCase } from "../../../usecases/pedido";
import { CheckoutUseCase } from "../../../usecases/checkout";

export const pedidoRoutes = async (app: FastifyInstance) => {
  const dbConnectionPedido = new PedidoDb()
  const dbConnectionProduto = new ProdutoDb()
  const dbConnectionCliente = new ClienteDb()
  const pedidoGateway = new PedidoGateway(dbConnectionPedido)
  const produtoGateway = new ProdutoGateway(dbConnectionProduto)
  const clienteGateway = new ClienteGateway(dbConnectionCliente)
  const pedidoUseCase = new PedidoUseCase(pedidoGateway)
  const checkoutUseCase = new CheckoutUseCase(pedidoUseCase, produtoGateway, clienteGateway)
  const pedidoController = new PedidoController(pedidoUseCase, checkoutUseCase)

  app.get('/pedidos', {}, async function (request, reply) {
    const response = await pedidoController.buscarPedidos(request)
    return reply.status(response.statusCode).send(response.data)
  })

  app.get('/pedido/:id/status-pagamento', {}, async function (request, reply) {
    const response = await pedidoController.statusPagamento(request)
    return reply.status(response.statusCode).send(response.data)
  })

  app.patch('/pedido/:id/status', {}, async function (request, reply) {
    const response = await pedidoController.atualizarStatusPedido(request)
    return reply.status(response.statusCode).send(response.data)
  })

  app.post('/pedido/checkout', {}, async function (request, reply) {
    const response = await pedidoController.checkout(request)
    return reply.status(response.statusCode).send(response.data)
  })
}
