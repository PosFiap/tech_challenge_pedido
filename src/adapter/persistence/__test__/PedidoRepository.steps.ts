import { mockReset } from "jest-mock-extended"

import { defineFeature, loadFeature } from "jest-cucumber"
import { prismaMock } from "../../../prisma/mockClient"
import { PrismaPedidoRepositoryGateway } from "../PedidoRepository"
import { Pedido } from "../../../modules/pedido/model/Pedido"
import { ProdutoDoPedido } from "../../../modules/pedido/model/Produto"

const feature = loadFeature(`./PedidoRepository.feature`, {
  loadRelativePath: true,
})

const makeSut = () => ({
  sut: new PrismaPedidoRepositoryGateway(),
})

defineFeature(feature, (test) => {
  beforeEach(() => {
    mockReset(prismaMock)
  })

  test("Deve retornar uma lista vazia", ({ given, when, then }) => {
    let sut: PrismaPedidoRepositoryGateway
    let listaDePedidos: Pedido[]

    given("que não possui nenhum pedido registrado", () => {
      sut = makeSut().sut
      prismaMock.pedido.findMany.mockResolvedValueOnce([])
    })

    when("solicitar a listagem", async () => {
      listaDePedidos = await sut.listaPedidos({ vinculaProdutos: true })
    })

    then("deve retornar uma lista vazia", () => {
      expect(listaDePedidos).toEqual([])
    })
  })

  test("Deve retornar uma lista com os pedidos", ({ given, when, then }) => {
    let sut: PrismaPedidoRepositoryGateway
    let dados: any
    let listaDePedidos: Pedido[]

    given("que tenho registrado no banco os pedidos", (dadosPedidos) => {
      sut = makeSut().sut
      dados = JSON.parse(dadosPedidos)
      dados.forEach(
        (item: any) => (item.data_criacao = new Date(item.data_criacao)),
      )

      prismaMock.pedido.findMany.mockResolvedValueOnce(dados)
    })

    when("solicitar a listagem", async () => {
      listaDePedidos = await sut.listaPedidos({ vinculaProdutos: true })
    })

    then("deve retornar uma lista com os pedidos existentes", () => {
      const pedidos = dados.map(
        (item: any) =>
          new Pedido(
            item.cpf_cliente,
            item.ProdutoPedido.map(
              (p: any) =>
                new ProdutoDoPedido(
                  p.produto_codigo,
                  p.nome,
                  p.descricao,
                  p.valor,
                  p.observacoes,
                ),
            ),
            item.codigo,
            item.data_criacao,
          ),
      )

      expect(listaDePedidos).toEqual(pedidos)
      expect(listaDePedidos[0].CPF).toBe('01234567890')
    })
  })

  test("Deve retornar uma lista com pedidos sem os produtos", ({
    given,
    when,
    then,
  }) => {
    let sut: PrismaPedidoRepositoryGateway
    let dados: any
    let listaDePedidos: Pedido[]

    given("que tenho registrado no banco os pedidos", (dadosPedidos) => {
      sut = makeSut().sut
      dados = JSON.parse(dadosPedidos)
      dados.forEach(
        (item: any) => (item.data_criacao = new Date(item.data_criacao)),
      )

      prismaMock.pedido.findMany.mockResolvedValueOnce(dados)
    })

    when("solicitar a listagem", async () => {
      listaDePedidos = await sut.listaPedidos({ vinculaProdutos: false })
    })

    then("deve retornar uma lista com os pedidos existentes", () => {
      const pedidos = dados.map(
        (item: any) =>
          new Pedido(item.cpf_cliente, [], item.codigo, item.data_criacao),
      )

      expect(listaDePedidos).toEqual(pedidos)
    })
  })

  test("Deve retornar null por não encontrar o pedido", ({
    given,
    when,
    then,
  }) => {
    let sut = makeSut().sut
    let codigoPedido: number

    given(/^um codigo de pedido (\d+) não existente$/, (codigo) => {
      codigoPedido = parseInt(codigo)
    })

    when("buscar na banco de dados", () => {
      prismaMock.pedido.findUnique.mockResolvedValueOnce(null)
    })

    then("deve retornar nulo", async () => {
      const pedido = await sut.obtemPedido(codigoPedido)
      expect(pedido).toBeNull()
    })
  })

  test("Deve retornar o pedido", ({ given, when, then }) => {
    let sut = makeSut().sut
    let codigoPedido: number
    let dados: any

    given(/^um codigo de pedido (\d+) existente$/, (codigo) => {
      codigoPedido = parseInt(codigo)
    })

    when("buscar na banco de dados", (doc) => {
      dados = JSON.parse(doc)
      dados.data_criacao = new Date(dados.data_criacao)
      prismaMock.pedido.findUnique.mockResolvedValueOnce(dados)
    })

    then("deve retornar o pedido", async () => {
      const pedido = await sut.obtemPedido(1)
      expect(pedido).toEqual(
        new Pedido(
          dados.cpf_cliente,
          dados.ProdutoPedido.map(
            (p: any) =>
              new ProdutoDoPedido(
                p.produto_codigo,
                p.nome,
                p.descricao,
                p.valor,
                p.observacoes,
              ),
          ),
          dados.codigo,
          new Date(dados.data_criacao),
        ),
      )
    })
  })

  test("Deve retornar o pedido sem cpf", ({ given, when, then }) => {
    let sut = makeSut().sut
    let codigoPedido: number
    let dados: any

    given(/^um codigo de pedido (\d+) existente$/, (codigo) => {
      codigoPedido = parseInt(codigo)
    })

    when("buscar na banco de dados", (doc) => {
      dados = JSON.parse(doc)
      dados.data_criacao = new Date(dados.data_criacao)
      prismaMock.pedido.findUnique.mockResolvedValueOnce(dados)
    })

    then("deve retornar o pedido", async () => {
      const pedido = await sut.obtemPedido(1)

      expect(pedido).toEqual(
        new Pedido(
          dados.cpf_cliente,
          dados.ProdutoPedido.map(
            (p: any) =>
              new ProdutoDoPedido(
                p.produto_codigo,
                p.nome,
                p.descricao,
                p.valor,
                p.observacoes,
              ),
          ),
          dados.codigo,
          new Date(dados.data_criacao),
        ),
      )
    })
  })

  test("Deve retornar o pedido com o codigo do pedido ao ser registrado no banco de dados", ({
    given,
    when,
    then,
  }) => {
    let sut = makeSut().sut
    let dados: any
    let pedido: Pedido

    given("um pedido para ser registrado", (doc) => {
      dados = JSON.parse(doc)
      dados.data_criacao = new Date(dados.dataPedido)
    })

    when("persistir o registro", () => {
      prismaMock.pedido.create.mockResolvedValueOnce({
        codigo: 1,
        data_criacao: dados.data_criacao,
        cpf_cliente: dados.cpf_cliente,
      })
    })

    then(
      "deve retornar o pedido com o codigo gerado no banco de dados",
      async () => {
        const insertValue = new Pedido(
          dados.cpf_cliente,
          dados.produtosPedido.map(
            (item: any) =>
              new ProdutoDoPedido(
                item.codigo,
                item.nome,
                item.descricao,
                item.valor,
                item.observacoes,
              ),
          ),
          null,
          dados.data_criacao,
        )

        pedido = await sut.registraPedido(insertValue)

        expect(pedido).toEqual(
          new Pedido(
            dados.cpf_cliente,
            dados.produtosPedido.map(
              (p: any) =>
                new ProdutoDoPedido(
                  p.codigo,
                  p.nome,
                  p.descricao,
                  p.valor,
                  p.observacoes,
                ),
            ),
            1,
            new Date(dados.data_criacao),
          ),
        )
      },
    )

    then(/^deve resultar no valor total de (\d.*)$/, async (valorTotal) => {
      expect(pedido.valorTotal.toFixed(2)).toEqual(valorTotal)
    })
  })
})
