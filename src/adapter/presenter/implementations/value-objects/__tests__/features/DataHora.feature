# language: pt

Funcionalidade: Formata Data Hora

    Cenario: O valor maior que hoje deve retornar erro
        Dado que recebi uma data com "2" dias no futuro
        Quando eu crio uma instancia de DataHora
        Então deveria receber um erro "A data é inválida"

    Cenario: O valor null deve retornar erro
        Dado que recebi uma data nula
        Quando eu crio uma instancia de DataHora
        Então deveria receber um erro "A data é inválida"

    Cenario: Formatando uma data hora valida 2023,0,1,0,0
        Dado que recebi oa valores de data hora 2023,0,1,0,0
        Quando eu crio uma instancia de DataHora
        Então chamo o método formataData e deveria receber o valor "01/01/2023 00:00"

    Cenario: Formatando uma data hora valida 2022,11,31,23,59
        Dado que recebi oa valores de data hora 2022,11,31,23,59
        Quando eu crio uma instancia de DataHora
        Então chamo o método formataData e deveria receber o valor "31/12/2022 23:59"
