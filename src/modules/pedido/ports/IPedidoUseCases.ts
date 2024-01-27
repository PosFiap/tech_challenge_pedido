import { IListaPedidosUseCase } from './IListaPedidosUseCase'
import { IRegistraPedidoUseCase } from './IRegistraPedidoUseCase'

export interface IPedidoUseCases extends IRegistraPedidoUseCase, IListaPedidosUseCase {}
