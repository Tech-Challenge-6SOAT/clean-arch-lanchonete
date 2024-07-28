export const atualizarStatusPagamentoSchema = {
  tags: ["webhook"],
  body: {
    type: "object",
    properties: {
      id: { type: "string" },
      status: { type: "string" },
    },
    required: ["id", "status"],
  },
  response: {
    201: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};
