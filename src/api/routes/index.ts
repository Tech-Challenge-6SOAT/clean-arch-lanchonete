import { FastifyInstance } from "fastify";
import { clienteRoutes } from "./cliente";

const apiRoutes = async (app: FastifyInstance) => {
  app.register(clienteRoutes);
  app.get("/", async () => {
    return {
      message: "API IS ON FIRE!",
    };
  });
};

export default apiRoutes;
