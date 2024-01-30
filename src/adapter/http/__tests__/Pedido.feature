# language: pt

Funcionalidade: RotasPedido

  Cenario: Cadastrar um pedido
    Dado as informações de um pedido
    """
    {
    	"CPF": "41099837898",
    	"itemDePedido": [
    		{
    			"valor": 13.4,
    			"descricao": "disco feito de mix de carne",
    			"nome": "hamburguer",
    			"codigo": 1
    		},
    		{
    			"valor": 6.9,
    			"descricao": "Suco da polpa da frita",
    			"nome": "Suco de abacaxi com hortelã",
    			"codigo": 3,
    			"observacoes": "Com gelo sem açucar"
    		}
    	]
    }
    """
    Quando uma request http/post é efetuada
    Então registra o pedido e retorna o mesmo com seu codigo
    """
    {
      "data": "29/01/2024 05:09",
      "CPF_cliente": "410.998.378-98",
      "numero_pedido": "1",
      "valor_total": "R$ 20,30",
      "itens_pedido": [
        {
          "nome": "hamburguer",
          "valor": "R$ 13,40"
        },
        {
          "nome": "Suco de abacaxi com hortelã",
          "valor": "R$ 6,90",
          "observacoes": "Com gelo sem açucar"
        }
      ]
    }
    """

  Cenario: Listar pedido
    Dado as necessidade de visualizar os pedidos
    Quando uma request http/get é efetuada
    Então então uma lista de pedidos é retornada
    """
    [{
      "data": "01/11/2023 20:43",
      "CPF_cliente": "012.345.678-90",
      "numero_pedido": "1",
      "valor_total": "R$ 23,80",
      "itens_pedido": [
        {
          "nome": "coca lata",
          "valor": "R$ 6,90"
        },
        {
          "nome": "x-salada",
          "valor": "R$ 16,90",
          "observacoes": "sem cebola"
        }
      ]
    }]
    """

  Cenario: Obter um pedido
    Dado o codigo de um pedido 1
    Quando uma request http/get é efetuada
    Então então o pedidos é retornada
    """
    {
      "data": "01/11/2023 20:43",
      "CPF_cliente": "012.345.678-90",
      "numero_pedido": "1",
      "valor_total": "R$ 23,80",
      "itens_pedido": [
        {
          "nome": "coca lata",
          "valor": "R$ 6,90"
        },
        {
          "nome": "x-salada",
          "valor": "R$ 16,90",
          "observacoes": "sem cebola"
        }
      ]
    }
    """
