import { HttpRequest, HttpResponse } from "../../interfaces/http";
import { PedidoUseCase } from "../../usecases/pedido";

export class PedidoController {
  constructor(private readonly pedidoUseCase: PedidoUseCase) { }

  async buscarPedidos(request: HttpRequest): Promise<HttpResponse> {
    try {
      const pedidos = await this.pedidoUseCase.buscarPedidos();

      return {
        data: {
          pedidos,
        },
        statusCode: 200,
      };
    } catch (err: any) {
      return {
        data: {
          err: err?.message,
        },
        statusCode: 500,
      };
    }
  }

  async atualizarStatusPedido(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = request.params;
      const { status } = request.body;

      const pedido = await this.pedidoUseCase.atualizarStatusPedido({
        id,
        status,
      });

      return {
        data: {
          pedido,
        },
        statusCode: 200,
      };
    } catch (err: any) {
      return {
        data: {
          err: err?.message,
        },
        statusCode: 500,
      };
    }
  }

  async statusPagamento(request: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = request.params;
      const statusPagamento = await this.pedidoUseCase.statusPagamento(id);

      return {
        data: {
          statusPagamento,
        },
        statusCode: 200,
      };
    } catch (err: any) {
      return {
        data: {
          err: err?.message,
        },
        statusCode: 500,
      };
    }
  }
}
