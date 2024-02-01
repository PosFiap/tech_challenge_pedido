# language: pt

Funcionalidade: isValidCPF

  Cenario: Cpf valido deve retornar valor true
    Dado um cpf informado "012-345-678-90"
    Quando fazemos a validação
    Então é retornado o valor true

  Cenario: Cpf invalido deve retornar valor false
    Dado um cpf informado "123.456.789-01"
    Quando fazemos a validação
    Então é retornado o valor false

  Cenario: Cpf com tamanho diferente de 11 caracteres é invalido e deve retornar valor false
    Dado um cpf informado "123.456.789-010"
    Quando fazemos a validação
    Então é retornado o valor false
