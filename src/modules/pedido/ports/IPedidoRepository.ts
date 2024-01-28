import { Pedido } from '../model/Pedido'

export interface IPedidoRepositoryGateway {
  registraPedido(pedido: Pedido): Promise<Pedido>
  listaPedidos(config: { vinculaProdutos: boolean }): Promise<Pedido[]>
  obtemPedido(codigoPedido: number): Promise<Pedido | null>
}
