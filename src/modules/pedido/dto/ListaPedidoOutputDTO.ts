import { CPF as CPFVO } from '../../common/value-objects/CPF'

export class ItemListaPedidoOutputDTO {
  private readonly _CPF: CPFVO | null

  constructor (
    readonly codigo: number,
    CPF: string | null,
    readonly dataPedido: Date,
    readonly produtosPedido: ItemProdutoListaPedidoOutputDTO[]
  ) {
    this._CPF = CPF ? new CPFVO(CPF) : null
  }

  get valorTotal (): string {
    const valorTotal = this.produtosPedido.reduce((valorSoma, item) => item.valor + valorSoma, 0)
    return valorTotal.toFixed(2)
  }

  get CPF (): string | null {
    return this._CPF?.valor ?? null
  }

  get quantidadeProdutosPedido (): number {
    return this.produtosPedido.length
  }
}

export class ItemProdutoListaPedidoOutputDTO {
  constructor (
    readonly nome: string,
    readonly valor: number,
    readonly observacoes?: string
  ) {}
}
