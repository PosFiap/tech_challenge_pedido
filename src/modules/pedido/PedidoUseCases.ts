import { ItemListaPedidoOutputDTO, ItemProdutoListaPedidoOutputDTO } from './dto/ListaPedidoOutputDTO'
import { InserePedidoDTO } from './dto/InserePedidoDTO'
import { InserePedidoOutputDTO } from './dto/InserePedidoOutputDTO'
import { Pedido } from './model/Pedido'
import { CustomError, CustomErrorType } from '../../utils/customError'
import { IPedidoRepositoryGateway, IPedidoUseCases } from './ports'
import { CPF } from '../common/value-objects'

export class PedidoUseCases implements IPedidoUseCases {
  async listaPedido(pedidoRepositoryGateway: IPedidoRepositoryGateway, codigoPedido: number): Promise<ItemListaPedidoOutputDTO | null> {
    const pedidoArmazenado = await pedidoRepositoryGateway.obtemPedido(codigoPedido)

    if (!pedidoArmazenado) return null

    const produtosPedido: ItemProdutoListaPedidoOutputDTO[] = pedidoArmazenado.produtosPedido.map(produtoPedido => {
            return new ItemProdutoListaPedidoOutputDTO(
              produtoPedido.nome,
              produtoPedido.valor,
              produtoPedido.observacoes
            )
          })

    const pedido: ItemListaPedidoOutputDTO = new ItemListaPedidoOutputDTO(
      pedidoArmazenado.codigo!,
      pedidoArmazenado.CPF,
      pedidoArmazenado.dataPedido!,
      produtosPedido
    )

    return pedido;
  }
  async listaPedidos (pedidoRepositoryGateway: IPedidoRepositoryGateway): Promise<ItemListaPedidoOutputDTO[]> {
    const pedidosArmazenados = await pedidoRepositoryGateway.listaPedidos({
      vinculaProdutos: true
    })

    const listaPedidos: ItemListaPedidoOutputDTO[] =
            pedidosArmazenados.map((pedido: Pedido) => {
              const produtosPedido: ItemProdutoListaPedidoOutputDTO[] =
                    pedido.produtosPedido.map(produtoPedido => {
                      return new ItemProdutoListaPedidoOutputDTO(
                        produtoPedido.nome,
                        produtoPedido.valor,
                        produtoPedido.observacoes
                      )
                    })

              return new ItemListaPedidoOutputDTO(
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
