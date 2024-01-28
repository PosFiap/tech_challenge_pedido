export class ProdutoDoPedido {
  constructor (
    readonly codigo: number,
    readonly nome: string,
    readonly descricao: string,
    readonly valor: number,
    readonly observacoes?: string
  ) {}
}
