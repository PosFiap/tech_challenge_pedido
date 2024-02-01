# language: pt

Funcionalidade: Format CPF

    Cenario: Criando um cpf
        Dado que recebi um cpf 00000000000
        Quando eu crio uma instancia do CPF
        Então chamo o método formatCPF e deveria receber um valor formatado "000.000.000-00"

    Cenario: Criando um cpf sem informar nenhum valor
        Dado que não recebi nenhum cpf
        Quando eu crio uma instancia do CPF
        Então deveria receber um erro "O CPF é inválido"

    Cenario: O CPF nulo deve retornar erro
        Dado que recebi cpf nulo null
        Quando eu crio uma instancia do CPF
        Então deveria receber um erro "O CPF é inválido"

    Cenario: O CPF de tamanho 0 deve retornar erro
        Dado que recebi cpf ""
        Quando eu crio uma instancia do CPF
        Então deveria receber um erro "O CPF é inválido"

    Cenario: O CPF de tamanho 10 deve retornar erro
        Dado que recebi cpf "0000000000"
        Quando eu crio uma instancia do CPF
        Então deveria receber um erro "O CPF é inválido"

    Cenario: O CPF de tamanho 12 deve retornar erro
        Dado que recebi cpf "000000000000"
        Quando eu crio uma instancia do CPF
        Então deveria receber um erro "O CPF é inválido"
