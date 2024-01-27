import { ItemListaPedidoAndamentoOutputDTO, ItemProdutoListaPedidoAndamentoOutputDTO } from './dto/ListaPedidoOutputDTO'
import { InserePedidoDTO } from './dto/InserePedidoDTO'
import { InserePedidoOutputDTO } from './dto/InserePedidoOutputDTO'
import { Pedido } from './model/Pedido'
import { CustomError, CustomErrorType } from '../../utils/customError'
import { IPedidoRepositoryGateway, IPedidoUseCases } from './ports'
import { CPF } from '../common/value-objects'

export class PedidoUseCases implements IPedidoUseCases {
  async listaPedidosAndamento (pedidoRepositoryGateway: IPedidoRepositoryGateway): Promise<ItemListaPedidoAndamentoOutputDTO[]> {
    const pedidosArmazenados = await pedidoRepositoryGateway.listaPedidos({
      vinculaProdutos: true
    })

    const listaPedidos: ItemListaPedidoAndamentoOutputDTO[] =
            pedidosArmazenados.map((pedido: Pedido) => {
              const produtosPedido: ItemProdutoListaPedidoAndamentoOutputDTO[] =
                    pedido.produtosPedido.map(produtosPedido => {
                      return new ItemProdutoListaPedidoAndamentoOutputDTO(
                        produtosPedido.nome,
                        produtosPedido.valor,
                      )
                    })

              return new ItemListaPedidoAndamentoOutputDTO(
                pedido.codigo!,
                pedido.CPF,
                pedido.dataPedido!,
                produtosPedido
              )
            });

    return listaPedidos;
  }

  async registraPedido (data: InserePedidoDTO, pedidoRepositoryGateway: IPedidoRepositoryGateway): Promise<InserePedidoOutputDTO> {
    let pedidoInserido: Pedido
    let itensDePedidoCompletos = data.produtosPedido;

    try {
      pedidoInserido = await pedidoRepositoryGateway.registraPedido(new Pedido(
        data.CPF,
        itensDePedidoCompletos,
        null,
        null
      ));

    } catch (err) {
      if (err instanceof CustomError) throw err
      throw new CustomError(CustomErrorType.RepositoryUnknownError, (err as Error).message)
    }

    return new InserePedidoOutputDTO(
      pedidoInserido.codigo!,
      pedidoInserido.valorTotal,
      pedidoInserido.CPF ? new CPF(pedidoInserido.CPF) : null,
      pedidoInserido.dataPedido!,
      itensDePedidoCompletos
    )
  }
}
