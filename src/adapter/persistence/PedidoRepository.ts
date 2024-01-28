import { PrismaClient } from '@prisma/client'
import { IPedidoRepositoryGateway } from '../../modules/pedido'
import { Pedido } from '../../modules/pedido/model/Pedido'
import { ProdutoDoPedido } from '../../modules/pedido/model/Produto'
import prisma from '../../prisma/client'

export class PrismaPedidoRepositoryGateway implements IPedidoRepositoryGateway {
  private readonly prisma: PrismaClient

  constructor () {
    this.prisma = prisma
  }

  async registraPedido (pedido: Pedido): Promise<Pedido> {
    const pedidoInserido = await this.prisma.pedido.create({
      data: {
        cpf_cliente: pedido.CPF,
        ProdutoPedido: {
          createMany: {
            data: pedido.produtosPedido.map((produto) => ({
              valor: produto.valor,
              descricao: produto.descricao,
              nome: produto.nome,
              produto_codigo: produto.codigo,
              observacoes: produto.observacoes
            }))
          }
        }
      }
    })

    return new Pedido(
      pedidoInserido.cpf_cliente,
      pedido.produtosPedido,
      pedidoInserido.codigo,
      pedidoInserido.data_criacao
    )
  }

  async listaPedidos ({ vinculaProdutos }: { vinculaProdutos: boolean }): Promise<Pedido[]> {
    const pedidos = await this.prisma.pedido.findMany({
      orderBy: [
        {
          data_criacao: 'asc',
        },
      ],
      include: {
        ProdutoPedido: vinculaProdutos
      } 
    })

    return pedidos.map((pedido) => (new Pedido(
      pedido.cpf_cliente,
      vinculaProdutos ? pedido.ProdutoPedido.map((produtoPedido) => {
        return new ProdutoDoPedido(
          produtoPedido.produto_codigo,
          produtoPedido.nome,
          produtoPedido.descricao,
          produtoPedido.valor,
          produtoPedido.observacoes ?? undefined
        )
      }) : [],
      pedido.codigo,
      pedido.data_criacao
    )))
  }

  async obtemPedido (codigoPedido: number): Promise<Pedido | null> {
    const pedido = await this.prisma.pedido.findUnique({
      where: {
        codigo: codigoPedido
      },
      include: {
        ProdutoPedido: true
      }
    })

    if(!pedido) return null

    return new Pedido(
      pedido.cpf_cliente ?? null,
      pedido.ProdutoPedido.map((produtoPedido) => {
        return new ProdutoDoPedido(
          produtoPedido.produto_codigo,
          produtoPedido.nome,
          produtoPedido.descricao,
          produtoPedido.valor,
          produtoPedido.observacoes ?? undefined
        )
      }),
      pedido.codigo!,
      pedido.data_criacao!
    )
  }
}
