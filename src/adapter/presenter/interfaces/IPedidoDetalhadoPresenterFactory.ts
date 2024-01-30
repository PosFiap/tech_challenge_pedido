import { IPedidoDetalhadoPresenter, IProdutoPedidoDetalhadoPresenter } from './IPedidoDetalhadoPresenter'

export interface IPedidoDetalhadoPresenterFactory {
  create(
    codigoPedido: number,
    itensPedido: IProdutoPedidoDetalhadoPresenter[],
    dataPedido: Date,
    CPFCliente?: string,
    codigoFatura?: string,
  ): IPedidoDetalhadoPresenter
}
