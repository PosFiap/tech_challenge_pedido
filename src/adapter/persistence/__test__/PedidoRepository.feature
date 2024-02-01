# language: pt

Funcionalidade: PedidoRepository

  Cenario: Deve retornar uma lista vazia
    Dado que não possui nenhum pedido registrado
    Quando solicitar a listagem
    Então deve retornar uma lista vazia

  Cenario: Deve retornar uma lista com os pedidos
    Dado que tenho registrado no banco os pedidos
    """
    [{
      "codigo": 1,
      "cpf_cliente": "01234567890",
      "data_criacao": "2023-11-01T23:43:07.000Z",
      "ProdutoPedido": [
        {
          "produto_codigo": 1,
          "nome": "coca lata",
          "descricao": "refrigerante",
          "valor": 6.9
        },
        {
          "produto_codigo": 2,
          "nome": "x-salada",
          "descricao": "lanche",
          "valor": 16.9,
          "observacoes": "sem cebola"
        }
      ]
    }]
    """
    Quando solicitar a listagem
    Então deve retornar uma lista com os pedidos existentes

  Cenario: Deve retornar uma lista com pedidos sem os produtos
    Dado que tenho registrado no banco os pedidos
    """
    [{
      "codigo": 1,
      "cpf_cliente": "01234567890",
      "data_criacao": "2023-11-01T23:43:07.000Z",
      "ProdutoPedido": [
        {
          "produto_codigo": 1,
          "nome": "coca lata",
          "descricao": "refrigerante",
          "valor": 6.9
        },
        {
          "produto_codigo": 2,
          "nome": "x-salada",
          "descricao": "lanche",
          "valor": 16.9,
          "observacoes": "sem cebola"
        }
      ]
    }]
    """
    Quando solicitar a listagem
    Então deve retornar uma lista com os pedidos existentes

  Cenario: Deve retornar null por não encontrar o pedido
    Dado um codigo de pedido 1 não existente
    Quando buscar na banco de dados
    Então deve retornar nulo

  Cenario: Deve retornar o pedido
    Dado um codigo de pedido 1 existente
    Quando buscar na banco de dados
    """
    {
      "codigo": 1,
      "cpf_cliente": "01234567890",
      "data_criacao": "2023-11-01T23:43:07.000Z",
      "ProdutoPedido": [
        {
          "produto_codigo": 1,
          "nome": "coca lata",
          "descricao": "refrigerante",
          "valor": 6.9
        },
        {
          "produto_codigo": 2,
          "nome": "x-salada",
          "descricao": "lanche",
          "valor": 16.9,
          "observacoes": "sem cebola"
        }
      ]
    }
    """
    Então deve retornar o pedido

  Cenario: Deve retornar o pedido sem cpf
    Dado um codigo de pedido 1 existente
    Quando buscar na banco de dados
    """
    {
      "codigo": 1,
      "data_criacao": "2023-11-01T23:43:07.000Z",
      "ProdutoPedido": [
        {
          "produto_codigo": 1,
          "nome": "coca lata",
          "descricao": "refrigerante",
          "valor": 6.9
        },
        {
          "produto_codigo": 2,
          "nome": "x-salada",
          "descricao": "lanche",
          "valor": 16.9,
          "observacoes": "sem cebola"
        }
      ]
    }
    """
    Então deve retornar o pedido

  Cenario: Deve retornar o pedido com o codigo do pedido ao ser registrado no banco de dados
    Dado um pedido para ser registrado
    """
    {
      "produtosPedido": [
        {
          "codigo": 1,
          "nome": "coca lata",
          "descricao": "refrigerante",
          "valor": 6.9
        },
        {
          "codigo": 2,
          "nome": "x-salada",
          "descricao": "lanche",
          "valor": 16.9,
          "observacoes": "sem cebola"
        }
      ],
      "codigo": 1,
      "dataPedido": "2023-11-01T23:43:07.000Z"
    }
    """
    Quando persistir o registro
    Então deve retornar o pedido com o codigo gerado no banco de dados
    Então deve resultar no valor total de 23.80
