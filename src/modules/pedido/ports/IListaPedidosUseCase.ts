import { ItemListaPedidoOutputDTO } from '../dto/ListaPedidoOutputDTO'
import { IPedidoRepositoryGateway } from './IPedidoRepository'

export interface IListaPedidosUseCase {
  listaPedido(pedidoRepositoryGateway: IPedidoRepositoryGateway, codigoPedido: number): Promise<ItemListaPedidoOutputDTO | null>
  listaPedidos(pedidoRepositoryGateway: IPedidoRepositoryGateway): Promise<ItemListaPedidoOutputDTO[]>
}
