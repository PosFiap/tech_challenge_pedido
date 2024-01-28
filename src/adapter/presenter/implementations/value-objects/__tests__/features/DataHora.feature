Feature: Formata Data Hora

    Scenario: O valor maior que hoje deve retornar erro
        Given que recebi uma data com "2" dias no futuro
        When eu crio uma instancia de DataHora
        Then deveria receber um erro "A data é inválida"

    Scenario: O valor null deve retornar erro
        Given que recebi uma data nula
        When eu crio uma instancia de DataHora
        Then deveria receber um erro "A data é inválida"

    Scenario: Formatando uma data hora valida 2023,0,1,0,0
        Given que recebi oa valores de data hora 2023,0,1,0,0
        When eu crio uma instancia de DataHora
        Then chamo o método formataData e deveria receber o valor "01/01/2023 00:00"

    Scenario: Formatando uma data hora valida 2022,11,31,23,59
        Given que recebi oa valores de data hora 2022,11,31,23,59
        When eu crio uma instancia de DataHora
        Then chamo o método formataData e deveria receber o valor "31/12/2022 23:59"
