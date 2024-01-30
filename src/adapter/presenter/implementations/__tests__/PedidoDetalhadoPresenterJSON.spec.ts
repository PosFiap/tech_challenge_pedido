import { PedidoDetalhadoPresenterJSON } from '../PedidoDetalhadoPresenterJSON'

describe('Testa o presenter de Pagamento Detalhado', () => {
  it('Deve retornar um presenter JSON completo', () => {
    const pedidoDetalhadoPresenterJSON = new PedidoDetalhadoPresenterJSON(
      5,
      [
        { nome: 'coca', valor: 6.9 },
        { nome: 'x-salda', valor: 16.9 },
        { nome: 'batata frita', valor: 11.5, observacoes: 'sem sal' }
      ],
      new Date(Date.UTC(2023, 1, 20, 15, 30)),
      '01234567890',
      'asd123'
    )

    expect(pedidoDetalhadoPresenterJSON.format()).toEqual({
      data: '20/02/2023 15:30',
      numero_pedido: '5',
      CPF_cliente: '012.345.678-90',
      valor_total: 'R$ 35,30',
      itens_pedido: [
        { nome: 'coca', valor: 'R$ 6,90', observacoes: undefined },
        { nome: 'x-salda', valor: 'R$ 16,90', observacoes: undefined },
        { nome: 'batata frita', valor: 'R$ 11,50', observacoes: 'sem sal' }
      ],
      codigo_fatura: 'asd123'
    })
  })

  it('Deve retornar um presenter JSON sem CPF', () => {
    const pedidoDetalhadoPresenterJSON = new PedidoDetalhadoPresenterJSON(
      5,
      [
        { nome: 'coca', valor: 6.9 },
        { nome: 'x-salda', valor: 16.9 }
      ],
      new Date(Date.UTC(2023, 1, 20, 15, 30)),
      undefined,
      'asd123'
    )

    expect(pedidoDetalhadoPresenterJSON.format()).toEqual({
      data: '20/02/2023 15:30',
      numero_pedido: '5',
      valor_total: 'R$ 23,80',
      itens_pedido: [
        { nome: 'coca', valor: 'R$ 6,90', observacoes: undefined },
        { nome: 'x-salda', valor: 'R$ 16,90', observacoes: undefined }
      ],
      codigo_fatura: 'asd123'
    })
  })

  it('Deve retornar um presenter JSON sem codigo_fatura', () => {
    const pedidoDetalhadoPresenterJSON = new PedidoDetalhadoPresenterJSON(
      5,
      [
        { nome: 'coca', valor: 6.9 },
        { nome: 'x-salda', valor: 16.9 }
      ],
      new Date(Date.UTC(2023, 1, 20, 15, 30)),
      '01234567890'
    )

    expect(pedidoDetalhadoPresenterJSON.format()).toEqual({
      data: '20/02/2023 15:30',
      numero_pedido: '5',
      valor_total: 'R$ 23,80',
      itens_pedido: [
        { nome: 'coca', valor: 'R$ 6,90', observacoes: undefined },
        { nome: 'x-salda', valor: 'R$ 16,90', observacoes: undefined }
      ],
      CPF_cliente: '012.345.678-90'
    })
  })
})
