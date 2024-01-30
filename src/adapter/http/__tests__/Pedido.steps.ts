import { defineFeature, loadFeature } from 'jest-cucumber'
import request from 'supertest'
import express from 'express'

import { prismaMock } from '../../../prisma/mockClient'
import { PedidoHTTP } from '../pedido'
import { PedidoController } from '../../controller/PedidoController'
import { PrismaPedidoRepositoryGateway } from '../../persistence/PedidoRepository'

const feature = loadFeature('./Pedido.feature', {
  loadRelativePath: true
})

const app = express()
app.use(express.json())

const pedidoHTTP = new PedidoHTTP(
  PedidoController.create(),
  new PrismaPedidoRepositoryGateway()
)

app.use('/pedido', pedidoHTTP.getRouter())

const mockPedidoValue = [
  {
    codigo: 1,
    cpf_cliente: '01234567890',
    data_criacao: new Date('2023-11-01T20:43:07'),
    ProdutoPedido: [
      {
        produto_codigo: 1,
        nome: 'coca lata',
        descricao: 'refrigerante',
        valor: 6.9
      },
      {
        produto_codigo: 2,
        nome: 'x-salada',
        descricao: 'lanche',
        valor: 16.9,
        observacoes: 'sem cebola'
      }
    ]
  }
]

defineFeature(feature, (test) => {
  test('Cadastrar um pedido', ({ given, when, then }) => {
    let data: any
    let result: any

    given('as informações de um pedido', (doc) => {
      data = JSON.parse(doc)
    })

    when('uma request http/post é efetuada', async () => {
      prismaMock.pedido.create.mockResolvedValueOnce({
        codigo: 1,
        data_criacao: new Date(),
        cpf_cliente: data.CPF
      })

      result = await request(app)
        .post('/pedido')
        .send(data)
        .set('Accept', 'application/json')

      expect(result.status).toBe(201)

      result = result.body
    })

    then('registra o pedido e retorna o mesmo com seu codigo', (response) => {
      response = JSON.parse(response)
      response.data = result.data
      expect(result).toEqual(response)
    })
  })

  test('Listar pedido', ({ given, when, then }) => {
    let result: any

    given('as necessidade de visualizar os pedidos', () => { })

    when('uma request http/get é efetuada', async () => {
      prismaMock.pedido.findMany.mockResolvedValueOnce(mockPedidoValue)

      result = await request(app)
        .get('/pedido')
        .set('Accept', 'application/json')

      expect(result.status).toBe(200)

      result = result.body
    })

    then('então uma lista de pedidos é retornada', (docString) => {
      expect(result).toEqual(JSON.parse(docString))
    })
  })

  test('Obter um pedido', ({ given, when, then }) => {
    let codigo: number
    let result: any

    given(/^o codigo de um pedido (\d+)$/, (arg0) => {
      codigo = parseInt(arg0)
    })

    when('uma request http/get é efetuada', async () => {
      prismaMock.pedido.findUnique.mockResolvedValueOnce(mockPedidoValue[0])

      result = await request(app)
        .get(`/pedido/${codigo}`)
        .set('Accept', 'application/json')

      expect(result.status).toBe(200)

      result = result.body
    })

    then('então o pedidos é retornada', (docString) => {
      expect(result).toEqual(JSON.parse(docString))
    })
  })
})
