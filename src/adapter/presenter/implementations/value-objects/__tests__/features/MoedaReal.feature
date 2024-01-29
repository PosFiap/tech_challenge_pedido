# language: pt

Funcionalidade: Formata Moeda Real

    Cenario: O valor nulo deve retornar erro
        Dado que recebi um valor nulo
        Quando eu crio uma instancia de MoedaReal
        Então deveria receber um erro "Valor monetário inválido"

    Cenario: O valor menor que 0 deve retornar erro
        Dado que recebi um valor -1
        Quando eu crio uma instancia de MoedaReal
        Então deveria receber um erro "Valor monetário inválido"

    Cenario: O valor 0 deve retornar R$ 0,00
        Dado que recebi um valor 0
        Quando eu crio uma instancia de MoedaReal
        Então chamo o método formataMoeda e deveria receber o valor "R$ 0,00"

    Cenario: O valor 0.33333 deve retornar R$ 0,33
        Dado que recebi um valor 0.33333
        Quando eu crio uma instancia de MoedaReal
        Então chamo o método formataMoeda e deveria receber o valor "R$ 0,33"

    Cenario: O valor 1.999999999999 deve retornar R$ 2,00
        Dado que recebi um valor 0.33333
        Quando eu crio uma instancia de MoedaReal
        Então chamo o método formataMoeda e deveria receber o valor "R$ 0,33"

    Cenario: O valor 1000 deve retornar R$ 1.000,00
        Dado que recebi um valor 1000
        Quando eu crio uma instancia de MoedaReal
        Então chamo o método formataMoeda e deveria receber o valor "R$ 1.000,00"

    Cenario: O valor 10000 deve retornar R$ 10.000,00
        Dado que recebi um valor 10000
        Quando eu crio uma instancia de MoedaReal
        Então chamo o método formataMoeda e deveria receber o valor "R$ 10.000,00"

    Cenario: O valor 100000 deve retornar R$ 100.000,00
        Dado que recebi um valor 100000
        Quando eu crio uma instancia de MoedaReal
        Então chamo o método formataMoeda e deveria receber o valor "R$ 100.000,00"

    Cenario: O valor 1000000 deve retornar R$ 1.000.000,00
        Dado que recebi um valor 1000000
        Quando eu crio uma instancia de MoedaReal
        Então chamo o método formataMoeda e deveria receber o valor "R$ 1.000.000,00"

