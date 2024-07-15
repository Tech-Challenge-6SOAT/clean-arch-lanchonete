import { FastifyInstance } from "fastify";
import { FakeDb } from "../../../external/fake-db";
import { ProdutoGateway } from "../../../gateways/produto";
import { ProdutoUseCase } from "../../../usecases/produto";
import { ProdutoController } from "../../../controllers/produto";

export const produtoRoutes = async (app: FastifyInstance) => {
  const dbConnection = new FakeDb();
  const produtoGateWay = new ProdutoGateway(dbConnection);
  const produtouseCase = new ProdutoUseCase(produtoGateWay);
  const produtoController = new ProdutoController(produtouseCase);

  app.get("/produto", {}, async function (request, reply) {
    const response = await produtoController.buscarProdutoPorCategoria(request);
    return reply.status(response.statusCode).send(response.data);
  });

  app.get("/produto/:id", {}, async function (request, reply) {
    const response = await produtoController.buscarProdutoPorId(request);
    return reply.status(response.statusCode).send(response.data);
  });

  app.post("/produto", {}, async function (request, reply) {
    const response = await produtoController.criar(request);
    return reply.status(response.statusCode).send(response.data);
  });

  app.delete("/produto", {}, async function (request, reply) {
    const response = await produtoController.excluir(request);
    return reply.status(response.statusCode).send(response.data);
  });
};
