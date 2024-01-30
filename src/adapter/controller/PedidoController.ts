import { IPedidoUseCases, InserePedidoDTO, PedidoUseCases, IPedidoRepositoryGateway } from '../../modules/pedido'
import { IPedidoController, PedidoOutput, ItemListaPedidosProdutoOutput, ListaPedidosOutput, RegistraPedidoOutput } from './interfaces/IPedidoController'
import { CPF } from '../../modules/common/value-objects'
import { ProdutoDoPedido } from '../../modules/pedido/model/Produto'

export class PedidoController implements IPedidoController {
  private constructor (
    readonly pedidoUseCase: IPedidoUseCases
  ) {}

  static create (configuration: string = 'default'): PedidoController {
    if (configuration === 'default') {
      const service = new PedidoUseCases();
      return new PedidoController(service)
    }
    throw new Error('Invalid Configuration Setup')
  }

  async registraPedido(
      data: { cpf: string | null; produtoPedido: ProdutoDoPedido[] },
      pedidoRepositoryGateway: IPedidoRepositoryGateway,
    ): Promise<RegistraPedidoOutput> {
    try {
      const inputDTO = new InserePedidoDTO(data.cpf, data.produtoPedido)
      const pedidoCompleto = await this.pedidoUseCase.registraPedido(inputDTO, pedidoRepositoryGateway);

      return new RegistraPedidoOutput(
        pedidoCompleto.codigo,
        pedidoCompleto.CPF,
        pedidoCompleto.dataPedido,
        pedidoCompleto.itensPedido,
      );


    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async listaPedidos (pedidoRepositoryGateway: IPedidoRepositoryGateway): Promise<ListaPedidosOutput> {
    try {
      const listaPedidos = await this.pedidoUseCase.listaPedidos(pedidoRepositoryGateway);
      return new ListaPedidosOutput(listaPedidos.map((pedido) => {
        return new PedidoOutput(
          pedido.codigo,
          pedido.CPF ? new CPF(pedido.CPF) : null,
          pedido.dataPedido,
          pedido.produtosPedido.map((produto) => {
            return new ItemListaPedidosProdutoOutput(
              produto.nome,
              produto.valor,
              produto.observacoes
            )
          }));
      }));
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async listaPedido (pedidoRepositoryGateway: IPedidoRepositoryGateway, codigoPedido: number): Promise<PedidoOutput | null> {
    try {
      const pedido = await this.pedidoUseCase.listaPedido(pedidoRepositoryGateway, codigoPedido)

      if(!pedido) return null

      return new PedidoOutput(
          pedido.codigo,
          pedido.CPF ? new CPF(pedido.CPF) : null,
          pedido.dataPedido,
          pedido.produtosPedido.map((produto) => {
            return new ItemListaPedidosProdutoOutput(
              produto.nome,
              produto.valor,
              produto.observacoes
            )
          })
      )
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}
