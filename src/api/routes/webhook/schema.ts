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
        senha: { type: "string" },
        qrcode: { type: "string" },
      },
    },
  },
};
