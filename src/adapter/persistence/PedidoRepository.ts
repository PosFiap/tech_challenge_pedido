import { PrismaClient } from '@prisma/client'
import { IPedidoRepositoryGateway } from '../../modules/pedido'
import { Pedido } from '../../modules/pedido/model/Pedido'
import { ProdutoDoPedido } from '../../modules/pedido/model/Produto'
import { EStatus } from '../../modules/common/value-objects'

export class PrismaPedidoRepositoryGateway implements IPedidoRepositoryGateway {
  private readonly prisma: PrismaClient

  constructor () {
    this.prisma = new PrismaClient()
  }

  async registraPedido (pedido: Pedido): Promise<Pedido> {
    const pedidoInserido = await this.prisma.pedido.create({
      data: {
        cpf_cliente: pedido.CPF,
        ProdutoPedido: {
          createMany: {
            data: pedido.produtosPedido.map((produto) => ({
              valor_produto: produto.valor,
              produto_codigo: parseInt(produto.codigo),
              observacoes: null
            }))
          }
        }
      }
    })

    return new Pedido(
      pedidoInserido.cpf_cliente,
      pedido.produtosPedido,
      pedidoInserido.codigo,
      (pedidoInserido as any).data_criacao
    )
  }

  async listaPedidos (config: { vinculaProdutos: boolean }): Promise<Pedido[]> {
    const options = {
      where: {
        OR: [
          {
            status: EStatus.Pronto
          },
          {
            status: EStatus['Em preparação']
          },
          {
            status: EStatus.Recebido
          }
        ]
      },
      orderBy: [
        {
          status: 'desc',
        },
        {
          data_criacao: 'asc',
        },
      ],
      include: {} 
    }
    if (config.vinculaProdutos) {
      options.include = {
        ProdutoPedido: true
      }
    }
    //@ts-ignore
    const pedidos = await this.prisma.pedido.findMany(options)

    return pedidos.map((pedido: any) => (new Pedido(
      pedido.cpf_cliente!,
      pedido.ProdutoPedido.map((produtoPedido: Record<string, any>) => {
        return new ProdutoDoPedido(
          produtoPedido.produto_codigo,
          produtoPedido.nome,
          produtoPedido.descricao,
          produtoPedido.valor
        )
      }),
      pedido.codigo,
      pedido.data_criacao
    )))
  }

  async obtemPedido (codigoPedido: number): Promise<Pedido> {
    const pedido = await this.prisma.pedido.findUnique({
      where: {
        codigo: codigoPedido
      }
    })
    return new Pedido(
      pedido?.cpf_cliente ?? null,
      [],
      pedido?.codigo!
    )
  }
}
