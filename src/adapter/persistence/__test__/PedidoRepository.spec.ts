import { mockReset } from "jest-mock-extended"

import { PrismaPedidoRepositoryGateway } from "../PedidoRepository"
import { prismaMock } from "../../../prisma/mockClient"
import { ProdutoDoPedido } from "../../../modules/pedido/model/Produto"
import { Pedido } from "../../../modules/pedido/model/Pedido"

const makeSut = () => ({
  sut: new PrismaPedidoRepositoryGateway(),
})

const mockPedidoValue = [
  {
    codigo: 1,
    cpf_cliente: "01234567890",
    data_criacao: new Date("2023-11-01T20:43:07"),
    ProdutoPedido: [
      {
        produto_codigo: 1,
        nome: "coca lata",
        descricao: "refrigerante",
        valor: 6.9,
      },
      {
        produto_codigo: 2,
        nome: "x-salada",
        descricao: "lanche",
        valor: 16.9,
        observacoes: "sem cebola",
      },
    ],
  },
]

describe("PrismaPedidoRepositoryGateway", () => {
  beforeEach(() => {
    mockReset(prismaMock)
  })

  describe("listaPedidos", () => {
    it("Deve retornar uma lista vazia", async () => {
      const { sut } = makeSut()

      prismaMock.pedido.findMany.mockResolvedValueOnce([])

      await expect(
        sut.listaPedidos({ vinculaProdutos: true }),
      ).resolves.toEqual([])
    })

    it("Deve retornar uma lista com 3 pedidos", async () => {
      const { sut } = makeSut()

      prismaMock.pedido.findMany.mockResolvedValueOnce(mockPedidoValue)

      const result = await sut.listaPedidos({ vinculaProdutos: true })

      expect(result).toEqual([
        new Pedido(
          "01234567890",
          [
            new ProdutoDoPedido(1, "coca lata", "refrigerante", 6.9),
            new ProdutoDoPedido(2, "x-salada", "lanche", 16.9, "sem cebola"),
          ],
          1,
          new Date("2023-11-01T23:43:07.000Z"),
        ),
      ])
    })

    it("Deve retornar uma lista com 3 pedidos sem os produtos", async () => {
      const { sut } = makeSut()

      prismaMock.pedido.findMany.mockResolvedValueOnce(mockPedidoValue)

      const result = await sut.listaPedidos({ vinculaProdutos: false })

      expect(result).toEqual([
        new Pedido(
          "01234567890",
          [],
          1,
          new Date("2023-11-01T23:43:07.000Z"),
        ),
      ])
    })
  })

  describe("obtemPedido", () => {
    it("Deve retornar null por não encontrar o pedido", async () => {
      const { sut } = makeSut()

      prismaMock.pedido.findUnique.mockResolvedValueOnce(null)

      await expect(
        sut.obtemPedido(1),
      ).resolves.toEqual(null)
    })

    it("Deve retornar o pedido", async () => {
      const { sut } = makeSut()

      prismaMock.pedido.findUnique.mockResolvedValueOnce(mockPedidoValue[0])

      const result = await sut.obtemPedido(1)

      expect(result).toEqual(new Pedido(
        "01234567890",
        [
          new ProdutoDoPedido(1, "coca lata", "refrigerante", 6.9),
          new ProdutoDoPedido(2, "x-salada", "lanche", 16.9, "sem cebola"),
        ],
        1,
        new Date("2023-11-01T23:43:07.000Z"),
      ))
    })

    it("Deve retornar o pedido sem cpf", async () => {
      const { sut } = makeSut()

      const mockValue = { ...mockPedidoValue[0] }
      // @ts-expect-error
      mockValue.cpf_cliente = null

      prismaMock.pedido.findUnique.mockResolvedValueOnce(mockValue)

      const result = await sut.obtemPedido(1)

      expect(result).toEqual(new Pedido(
        null,
        [
          new ProdutoDoPedido(1, "coca lata", "refrigerante", 6.9),
          new ProdutoDoPedido(2, "x-salada", "lanche", 16.9, "sem cebola"),
        ],
        1,
        new Date("2023-11-01T23:43:07.000Z"),
      ))
    })
  })

  describe("registrarPedido", () => {
    it("Deve retornar o pedido com o codigo do pedido gerado pelo banco", async () => {
      const { sut } = makeSut()

      prismaMock.pedido.create.mockResolvedValueOnce({
        codigo: 1,
        data_criacao: mockPedidoValue[0].data_criacao,
        cpf_cliente: mockPedidoValue[0].cpf_cliente
      })

      const insertValue = new Pedido(
          mockPedidoValue[0].cpf_cliente,
          mockPedidoValue[0].ProdutoPedido.map(item => new ProdutoDoPedido(
            item.produto_codigo,
            item.nome,
            item.descricao,
            item.valor,
            item.observacoes
          )),
          null,
          mockPedidoValue[0].data_criacao
        )

      await expect(
        sut.registraPedido(insertValue),
      ).resolves.toEqual({ ...insertValue, codigo: 1 })
    })
  })
})
