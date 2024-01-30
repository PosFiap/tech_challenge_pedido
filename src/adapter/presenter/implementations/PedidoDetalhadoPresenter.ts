import {
  IPedidoDetalhadoPresenter,
  IProdutoPedidoDetalhadoPresenter
} from '../interfaces/IPedidoDetalhadoPresenter'

export abstract class PedidoDetalhadoPresenter
implements IPedidoDetalhadoPresenter {
  constructor (
    readonly codigoPedido: number,
    readonly itensPedido: IProdutoPedidoDetalhadoPresenter[],
    readonly dataPedido: Date,
    readonly CPFCliente?: string
  ) { }

  abstract format (): Object

  protected valorTotal (): number {
    return this.itensPedido.reduce((sum, crr) => {
      return (sum += crr.valor)
    }, 0)
  }
}
