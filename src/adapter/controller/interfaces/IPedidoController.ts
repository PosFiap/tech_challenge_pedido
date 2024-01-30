import { CPF } from '../../../modules/common/value-objects'
import { IPedidoRepositoryGateway, IPedidoUseCases } from '../../../modules/pedido'
import { ProdutoDoPedido } from '../../../modules/pedido/model/Produto'

export class RegistraPedidoOutput {
  constructor (
    readonly codigoPedido: number,
    readonly cpf: CPF | null,
    readonly dataPedido: Date,
    readonly produtos: ProdutoDoPedido[]
  ) {}
}

export class ListaPedidosOutput {
  constructor (readonly pedidos: PedidoOutput[]) {}
}

export class PedidoOutput {
  constructor (
    readonly codigoPedido: number,
    readonly cpf: CPF | null,
    readonly dataPedido: Date,
    readonly produtos: ItemListaPedidosProdutoOutput[]
  ) {}
}

export class ItemListaPedidosProdutoOutput {
  constructor (
    readonly nome: string,
    readonly valor: number,
    readonly observacoes?: string
  ) {}
}

export interface IPedidoController {

  pedidoUseCase: IPedidoUseCases

  listaPedidos(
    pedidoRepositoryGateway: IPedidoRepositoryGateway
  ): Promise<ListaPedidosOutput>

  listaPedido(
    pedidoRepositoryGateway: IPedidoRepositoryGateway,
    codigoPedido: number
  ): Promise<PedidoOutput | null>

  registraPedido(
    data: { cpf: string | null, produtoPedido: ProdutoDoPedido[] },
    pedidoRepositoryGateway: IPedidoRepositoryGateway,
  ): Promise<RegistraPedidoOutput>
}
