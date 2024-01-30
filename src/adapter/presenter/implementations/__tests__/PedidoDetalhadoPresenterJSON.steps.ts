import { defineFeature, loadFeature } from "jest-cucumber"
import { PedidoDetalhadoPresenterJSON } from "../PedidoDetalhadoPresenterJSON"

const feature = loadFeature(`./PedidoDetalhadoPresenterJSON.feature`, {
  loadRelativePath: true,
})

defineFeature(feature, (test) => {
  const dadoPedido = (given: any, context: any) => {
    given("os dados de um pedido", (dadosPedido: string) => {
      context.obj = JSON.parse(dadosPedido)
    })
  }

  const quandoCrioInstancia = (
    when: any,
    context: any
  ) => {
    when("instanciamos e solicitamos a formatação dos dados", () => {
      context.pedidoDetalhadoPresenterJSON = new PedidoDetalhadoPresenterJSON(
        context.obj.codigo,
        context.obj.produtosDoPedido,
        new Date(context.obj.dataCriacao),
        context.obj.cpf
      )

    })
  }

  const entaoReceboDadosFormatados = (
    then: any,
    context: any
  ) => {
    then("recebemos os dados formatados", (dadosFormatados: string) => {
      expect(context.pedidoDetalhadoPresenterJSON.format()).toEqual(
        JSON.parse(dadosFormatados),
      )
    })
  }

  test("Deve retornar um presenter JSON completo", ({ given, when, then }) => {
    const context = {
      obj: null,
      pedidoDetalhadoPresenterJSON: null
    }

    dadoPedido(given, context)
    quandoCrioInstancia(when, context)
    entaoReceboDadosFormatados(then, context)
  })

  test("Deve retornar um presenter JSON sem CPF", ({ given, when, then }) => {
    const context = {
      obj: null,
      pedidoDetalhadoPresenterJSON: null
    }

    dadoPedido(given, context)
    quandoCrioInstancia(when, context)
    entaoReceboDadosFormatados(then, context)
  })
})
