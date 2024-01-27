import { IPedidoUseCases, InserePedidoDTO, PedidoUseCases, IPedidoRepositoryGateway } from '../../modules/pedido'
import { IPedidoController, ItemListaPedidosAndamentoOutput, ItemListaPedidosAndamentoProdutoOutput, ListaPedidosAndamentoOutput, RegistraPedidoOutput } from './interfaces/IPedidoController'
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

      // TODO: chamar serviço de pagamento para gerar fatura e receber o id para redirecionar pro ghateway
      const codigoFatura = { fatura_id: '01234' } // await servicoPagamentoGateway.obtemFaturaPagamento(pedidoCompleto.valor);
      
      return new RegistraPedidoOutput(
        pedidoCompleto.codigo,
        pedidoCompleto.CPF,
        pedidoCompleto.dataPedido,
        pedidoCompleto.itensPedido,
        codigoFatura.fatura_id
      );


    } catch (err) {
      console.error(err)
      throw err
    }
  }

  async listaPedidosAndamento (pedidoRepositoryGateway: IPedidoRepositoryGateway): Promise<ListaPedidosAndamentoOutput> {
    try {
      const listaPedidos = await this.pedidoUseCase.listaPedidosAndamento(pedidoRepositoryGateway);
      return new ListaPedidosAndamentoOutput(listaPedidos.map((pedido) => {
        return new ItemListaPedidosAndamentoOutput(
          pedido.codigo,
          pedido.CPF ? new CPF(pedido.CPF) : null,
          pedido.dataPedido,
          pedido.produtosPedido.map((produto) => {
            return new ItemListaPedidosAndamentoProdutoOutput(
              produto.nome,
              produto.valor
            )
          }));
      }));
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}
