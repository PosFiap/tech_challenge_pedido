# language: pt

Funcionalidade: PedidoDetalhadoPresenterJSON

  Cenario: Deve retornar um presenter JSON completo
    Dado os dados de um pedido
    """
      {
        "codigo":5,
        "produtosDoPedido":[
           {
              "nome":"coca",
              "valor":6.9
           },
           {
              "nome":"x-salda",
              "valor":16.9
           },
           {
              "nome":"batata frita",
              "valor":11.5,
              "observacoes":"sem sal"
           }
        ],
        "dataCriacao":"2023-02-20T15:30:00.000Z",
        "cpf":"01234567890",
        "codigoFatura":"asd123"
      }
    """
    Quando instanciamos e solicitamos a formatação dos dados
    Então recebemos os dados formatados
    """
      {
        "data": "20/02/2023 15:30",
        "numero_pedido": "5",
        "CPF_cliente": "012.345.678-90",
        "valor_total": "R$ 35,30",
        "itens_pedido": [
          {
            "nome": "coca",
            "valor": "R$ 6,90"
          },
          {
            "nome": "x-salda",
            "valor": "R$ 16,90"
          },
          {
            "nome": "batata frita",
            "valor": "R$ 11,50",
            "observacoes": "sem sal"
          }
        ],
        "codigo_fatura": "asd123"
      }
    """

  Cenario: Deve retornar um presenter JSON sem CPF
    Dado os dados de um pedido
    """
      {
        "codigo":5,
        "produtosDoPedido":[
           {
              "nome":"coca",
              "valor":6.9
           },
           {
              "nome":"x-salda",
              "valor":16.9
           },
           {
              "nome":"batata frita",
              "valor":11.5,
              "observacoes":"sem sal"
           }
        ],
        "dataCriacao":"2023-02-20T15:30:00.000Z",
        "codigoFatura":"asd123"
      }
    """
    Quando instanciamos e solicitamos a formatação dos dados
    Então recebemos os dados formatados
    """
      {
        "data": "20/02/2023 15:30",
        "numero_pedido": "5",
        "valor_total": "R$ 35,30",
        "itens_pedido": [
          {
            "nome": "coca",
            "valor": "R$ 6,90"
          },
          {
            "nome": "x-salda",
            "valor": "R$ 16,90"
          },
          {
            "nome": "batata frita",
            "valor": "R$ 11,50",
            "observacoes": "sem sal"
          }
        ],
        "codigo_fatura": "asd123"
      }
    """

  Cenario: Deve retornar um presenter JSON sem codigo_fatura
    Dado os dados de um pedido
    """
      {
        "codigo":5,
        "produtosDoPedido":[
           {
              "nome":"coca",
              "valor":6.9
           },
           {
              "nome":"x-salda",
              "valor":16.9
           },
           {
              "nome":"batata frita",
              "valor":11.5,
              "observacoes":"sem sal"
           }
        ],
        "dataCriacao":"2023-02-20T15:30:00.000Z",
        "cpf":"01234567890"
      }
    """
    Quando instanciamos e solicitamos a formatação dos dados
    Então recebemos os dados formatados
    """
      {
        "data": "20/02/2023 15:30",
        "numero_pedido": "5",
        "valor_total": "R$ 35,30",
        "itens_pedido": [
          {
            "nome": "coca",
            "valor": "R$ 6,90"
          },
          {
            "nome": "x-salda",
            "valor": "R$ 16,90"
          },
          {
            "nome": "batata frita",
            "valor": "R$ 11,50",
            "observacoes": "sem sal"
          }
        ],
        "CPF_cliente": "012.345.678-90"
      }
    """
