Feature: Format CPF

    Scenario: Entrando com um cpf invalido
        Given que recebi um cpf null
        When eu crio crio uma instancia do CPF
        Then deveria receber um erro
