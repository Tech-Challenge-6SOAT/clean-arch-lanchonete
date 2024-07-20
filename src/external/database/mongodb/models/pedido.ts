import mongoose from "mongoose";
import { mongoConnection } from "../index"

const status = ['Recebido', 'Em preparação', 'Pronto', 'Finalizado']

const Schema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    enum: [...status]
  },
  produtos: [
    {
      produto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'produtos',
        required: true,
      },
      quantidade: {
        type: Number,
        required: true,
      }
    }
  ],
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'clientes',
  },
  total: {
    type: Number,
    required: true,
  },
  senha: {
    type: String,
    required: true,
  },
  pagamentoStatus: {
    type: String,
    required: true,
    enum: ['Aprovado', 'Recusado', 'Pendente'] 
  },
}, {
  timestamps: true,
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
})

export const PedidoModel = mongoConnection.model('pedidos', Schema)
