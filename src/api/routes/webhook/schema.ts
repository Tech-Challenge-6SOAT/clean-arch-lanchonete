export const atualizarStatusPagamentoSchema = {
  tags: ["webhook"],
  body: {
    type: "object",
    properties: {
      idTransacaoExterna: { type: "string" },
      pagamentoStatus: {
        type: "object",
        properties: {
          status: { type: "string" },
        },
        required: ["status"],
      },
    },
    required: ["idTransacaoExterna", "pagamentoStatus"],
  },
  response: {
    201: {
      type: "object",
      properties: {
        id: { type: "string" },
        pedido: { type: "string" },
        valor: { type: "number" },
        pagamentoStatus: { type: "string" },
        data: { type: "string", format: "date-time" },
        idTransacaoExterna: { type: "string" },
      },
    },
  },
};
