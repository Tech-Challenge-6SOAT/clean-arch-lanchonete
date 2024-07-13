export interface DbConnection {
  buscar<T>(params: Object): Promise<T[]>
  buscarUm<T>(params: Object): Promise<T>
  criar<T>(params: Object): Promise<T>
  excluir(id: string): Promise<void>
  buscarEmConjuntoCom<T>(params: Object, juntarCom: string): Promise<T[]>
}

