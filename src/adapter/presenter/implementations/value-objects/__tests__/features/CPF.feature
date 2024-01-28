Feature: Format CPF

    Scenario: Criando um cpf
        Given que recebi um cpf 00000000000
        When eu crio uma instancia do CPF
        Then chamo o método formatCPF e deveria receber um valor formatado "000.000.000-00"

    Scenario: Criando um cpf sem informar nenhum valor
        Given que não recebi nenhum cpf
        When eu crio uma instancia do CPF
        Then deveria receber um erro "O CPF é inválido"

    Scenario: O CPF nulo deve retornar erro
        Given que recebi cpf nulo null
        When eu crio uma instancia do CPF
        Then deveria receber um erro "O CPF é inválido"

    Scenario: O CPF de tamanho 0 deve retornar erro
        Given que recebi cpf ""
        When eu crio uma instancia do CPF
        Then deveria receber um erro "O CPF é inválido"

    Scenario: O CPF de tamanho 10 deve retornar erro
        Given que recebi cpf "0000000000"
        When eu crio uma instancia do CPF
        Then deveria receber um erro "O CPF é inválido"

    Scenario: O CPF de tamanho 12 deve retornar erro
        Given que recebi cpf "000000000000"
        When eu crio uma instancia do CPF
        Then deveria receber um erro "O CPF é inválido"
