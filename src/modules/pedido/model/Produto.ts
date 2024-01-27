export class ProdutoDoPedido {
  constructor (
    readonly codigo: string,
    readonly nome: string,
    readonly descricao: string,
    readonly valor: number,
  ) {}
}
