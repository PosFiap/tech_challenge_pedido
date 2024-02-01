import { CPF as CPFVO } from '../../common/value-objects/CPF'
import { ProdutoDoPedido } from './Produto'

export class Pedido {
  private readonly _CPF: CPFVO | null
  constructor (
    CPF: string | null,
    readonly produtosPedido: ProdutoDoPedido[],
    readonly codigo: number | null,
    readonly dataPedido: Date | null = null
  ) {
    this._CPF = CPF ? new CPFVO(CPF) : null
  }

  get CPF (): string | null {
    return this._CPF?.valor ?? null
  }

  get valorTotal (): number {
    return this.produtosPedido.reduce((soma, item) => soma + item.valor, 0)
  }
}
