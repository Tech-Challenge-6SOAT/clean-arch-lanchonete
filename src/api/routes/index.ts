import { FastifyInstance } from "fastify";
import { clienteRoutes } from "./cliente";
import { pedidoRoutes } from "./pedido";

const apiRoutes = async (app: FastifyInstance) => {
  app.register(clienteRoutes);
  app.register(pedidoRoutes);
  app.get("/", async () => {
    return {
      message: "API IS ON FIRE!",
    };
  });
};

export default apiRoutes;
