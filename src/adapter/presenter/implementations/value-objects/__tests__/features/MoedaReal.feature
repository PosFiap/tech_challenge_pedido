Feature: Formata Moeda Real

    Scenario: O valor nulo deve retornar erro
        Given que recebi um valor nulo
        When eu crio uma instancia de MoedaReal
        Then deveria receber um erro "Valor monetário inválido"

    Scenario: O valor menor que 0 deve retornar erro
        Given que recebi um valor -1
        When eu crio uma instancia de MoedaReal
        Then deveria receber um erro "Valor monetário inválido"

    Scenario: O valor 0 deve retornar R$ 0,00
        Given que recebi um valor 0
        When eu crio uma instancia de MoedaReal
        Then chamo o método formataMoeda e deveria receber o valor "R$ 0,00"

    Scenario: O valor 0.33333 deve retornar R$ 0,33
        Given que recebi um valor 0.33333
        When eu crio uma instancia de MoedaReal
        Then chamo o método formataMoeda e deveria receber o valor "R$ 0,33"

    Scenario: O valor 1.999999999999 deve retornar R$ 2,00
        Given que recebi um valor 0.33333
        When eu crio uma instancia de MoedaReal
        Then chamo o método formataMoeda e deveria receber o valor "R$ 0,33"

    Scenario: O valor 1000 deve retornar R$ 1.000,00
        Given que recebi um valor 1000
        When eu crio uma instancia de MoedaReal
        Then chamo o método formataMoeda e deveria receber o valor "R$ 1.000,00"

    Scenario: O valor 10000 deve retornar R$ 10.000,00
        Given que recebi um valor 10000
        When eu crio uma instancia de MoedaReal
        Then chamo o método formataMoeda e deveria receber o valor "R$ 10.000,00"

    Scenario: O valor 100000 deve retornar R$ 100.000,00
        Given que recebi um valor 100000
        When eu crio uma instancia de MoedaReal
        Then chamo o método formataMoeda e deveria receber o valor "R$ 100.000,00"

    Scenario: O valor 1000000 deve retornar R$ 1.000.000,00
        Given que recebi um valor 1000000
        When eu crio uma instancia de MoedaReal
        Then chamo o método formataMoeda e deveria receber o valor "R$ 1.000.000,00"

