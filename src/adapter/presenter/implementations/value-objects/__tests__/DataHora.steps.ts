import { defineFeature, loadFeature } from 'jest-cucumber'
import { DataHora } from '../DataHora'

const feature = loadFeature('./features/DataHora.feature', { loadRelativePath: true })

defineFeature(feature, (test) => {
  test('O valor maior que hoje deve retornar erro', ({ given, when, then }) => {
    let date: Date
    let caller: any

    given(/^que recebi uma data com "(.*)" dias no futuro$/, (arg0) => {
      date = new Date()
      date.setDate(date.getDate() + parseInt(arg0))
    })

    when('eu crio uma instancia de DataHora', () => {
      caller = () => new DataHora(date)
    })

    then(/^deveria receber um erro "(.*)"$/, (arg0) => {
      expect(caller).toThrowError(arg0)
    })
  })

  test('O valor null deve retornar erro', ({ given, when, then }) => {
    let date: Date
    let caller: any

    given('que recebi uma data nula', () => {
      // @ts-expect-error
      date = null
    })

    when('eu crio uma instancia de DataHora', () => {
      caller = () => new DataHora(date)
    })

    then(/^deveria receber um erro "(.*)"$/, (arg0) => {
      expect(caller).toThrowError(arg0)
    })
  })

  test('Formatando uma data hora valida 2023,0,1,0,0', ({
    given,
    when,
    then
  }) => {
    let date: Date
    let dataHora: DataHora

    given(
      /^que recebi oa valores de data hora (\d+),(\d+),(\d+),(\d+),(\d+)$/,
      (arg0, arg1, arg2, arg3, arg4) => {
        date = new Date(Date.UTC(arg0, arg1, arg2, arg3, arg4))
      }
    )

    when('eu crio uma instancia de DataHora', () => {
      dataHora = new DataHora(date)
    })

    then(
      /^chamo o método formataData e deveria receber o valor "(.*)"$/,
      (arg0) => {
        expect(dataHora.formataData()).toBe(arg0)
      }
    )
  })

  test('Formatando uma data hora valida 2022,11,31,23,59', ({
    given,
    when,
    then
  }) => {
    let date: Date
    let dataHora: DataHora

    given(
      /^que recebi oa valores de data hora (\d+),(\d+),(\d+),(\d+),(\d+)$/,
      (arg0, arg1, arg2, arg3, arg4) => {
        date = new Date(Date.UTC(arg0, arg1, arg2, arg3, arg4))
      }
    )

    when('eu crio uma instancia de DataHora', () => {
      dataHora = new DataHora(date)
    })

    then(
      /^chamo o método formataData e deveria receber o valor "(.*)"$/,
      (arg0) => {
        expect(dataHora.formataData()).toBe(arg0)
      }
    )
  })
})
