import { FastifyInstance } from "fastify";
import { PedidoController } from "../../../controllers/pedido";
import { ClienteGateway, PedidoGateway, ProdutoGateway, TransacaoGateway } from "../../../gateways";
import { PedidoDbConnection, ProdutoDbConnection, ClienteDbConnection, TransacaoDbConnection } from "../../../external/database/mongodb/db-connections";
import { CheckoutUseCase, PagamentoUseCase, PedidoUseCase } from "../../../usecases";

export const pedidoRoutes = async (app: FastifyInstance) => {
  const pedidoDbConnection = new PedidoDbConnection()
  const pedidoGateway = new PedidoGateway(pedidoDbConnection)
  const pedidoUseCase = new PedidoUseCase(pedidoGateway)
  const produtoDbConnection = new ProdutoDbConnection()
  const produtoGateway = new ProdutoGateway(produtoDbConnection)
  const clienteDbConnection = new ClienteDbConnection()
  const clienteGateway = new ClienteGateway(clienteDbConnection)
  const transacaoDbConnection = new TransacaoDbConnection()
  const transacaoGateway = new TransacaoGateway(transacaoDbConnection)
  const pagamentoUseCase = new PagamentoUseCase(transacaoGateway)
  const checkoutUseCase = new CheckoutUseCase(pagamentoUseCase, pedidoUseCase, produtoGateway, clienteGateway)
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
