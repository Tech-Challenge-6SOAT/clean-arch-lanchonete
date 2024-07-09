export interface DbConnection {
  buscarPor<T>(
    tabela: string,
    filtros: Object,
    juntarCom?: string,
    ordenarPor?: string
  ): Promise<T>
  buscarUmPorId<T>(id: string): Promise<T>
  criar<T>(valores: Omit<T, 'id'>): Promise<T>
  excluir(id: string): Promise<void>
  atualizar<T>(values: T): Promise<T>
}
