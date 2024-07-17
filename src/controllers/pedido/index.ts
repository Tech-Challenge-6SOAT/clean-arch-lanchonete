import { HttpRequest, HttpResponse } from "../../interfaces/http";
import { PedidoUseCase } from "../../usecases/pedido";

export class PedidoController {
  constructor (
    private readonly pedidoUseCase: PedidoUseCase
  ) {}

  async buscarPedidos (request: HttpRequest): Promise<HttpResponse> {
    try {
      const pedidos = await this.pedidoUseCase.buscarPedidos()

      return {
        data: {
          pedidos
        },
        statusCode: 200
      }
    } catch (err: any) {
      return {
        data: {
          err: err?.message
        },
        statusCode: 500
      }
    }
  }
}

