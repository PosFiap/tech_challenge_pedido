import { CPF, EStatus } from '../../../modules/common/value-objects'
import { AtualizaStatusPedidoOutputDTO, IPedidoRepositoryGateway, IPedidoUseCases } from '../../../modules/pedido'
import { ProdutoDoPedido } from '../../../modules/pedido/model/Produto'

export class RegistraPedidoOutput {
  constructor(
    readonly codigoPedido: number,
    readonly cpf: CPF | null,
    readonly dataPedido: Date,
    readonly produtos: Array<ProdutoDoPedido>,
    readonly codigoFatura: string,
  ){}
}

export class ListaPedidosAndamentoOutput {
  constructor( readonly pedidos: ItemListaPedidosAndamentoOutput[] ) {}
}

export class ItemListaPedidosAndamentoOutput {
    constructor(
      readonly codigoPedido: number,
      readonly cpf: CPF | null,
      readonly dataPedido: Date,
      readonly produtos: Array<ItemListaPedidosAndamentoProdutoOutput>
    ){}
}

export class ItemListaPedidosAndamentoProdutoOutput {
  constructor(
    readonly nome: string,
    readonly valor: number,
  ){}
}

export interface IPedidoController {

  pedidoUseCase: IPedidoUseCases

  listaPedidosAndamento(
    pedidoRepositoryGateway: IPedidoRepositoryGateway
  ): Promise<ListaPedidosAndamentoOutput>;

  registraPedido(
    data: { cpf: string | null, produtoPedido: ProdutoDoPedido[] },
    pedidoRepositoryGateway: IPedidoRepositoryGateway,
  ): Promise<RegistraPedidoOutput>
}
