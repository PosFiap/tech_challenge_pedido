import { defineFeature, loadFeature } from 'jest-cucumber'
import { MoedaReal } from '../MoedaReal'

const feature = loadFeature('./features/MoedaReal.feature', { loadRelativePath: true })

defineFeature(feature, (test) => {
  test('O valor nulo deve retornar erro', ({ given, when, then }) => {
    let caller: any
    given('que recebi um valor nulo', () => { })

    when('eu crio uma instancia de MoedaReal', () => {
      // @ts-expect-error
      caller = () => new MoedaReal()
    })

    then(/^deveria receber um erro "(.*)"$/, (arg0) => {
      expect(caller).toThrowError(arg0)
    })
  })

  test('O valor menor que 0 deve retornar erro', ({ given, when, then }) => {
    let input: number
    let caller: any

    given(/^que recebi um valor (-\d+)$/, (arg0) => {
      input = parseFloat(arg0)
    })

    when('eu crio uma instancia de MoedaReal', () => {
      caller = () => new MoedaReal(input)
    })

    then(/^deveria receber um erro "(.*)"$/, (arg0) => {
      expect(caller).toThrowError(arg0)
    })
  })

  test('O valor 0 deve retornar R$ 0,00', ({ given, when, then }) => {
    let input: number
    let moedaReal: MoedaReal

    given(/^que recebi um valor (\d+)$/, (arg0) => {
      input = parseFloat(arg0)
    })

    when('eu crio uma instancia de MoedaReal', () => {
      moedaReal = new MoedaReal(input)
    })

    then(
      /^chamo o método formataMoeda e deveria receber o valor "(.*)"$/,
      (arg0) => {
        expect(moedaReal.formataMoeda()).toBe(arg0)
      }
    )
  })

  test('O valor 0.33333 deve retornar R$ 0,33', ({ given, when, then }) => {
    let input: number
    let moedaReal: MoedaReal

    given(/^que recebi um valor (\d.*)$/, (arg0) => {
      input = parseFloat(arg0)
    })

    when('eu crio uma instancia de MoedaReal', () => {
      moedaReal = new MoedaReal(input)
    })

    then(
      /^chamo o método formataMoeda e deveria receber o valor "(.*)"$/,
      (arg0) => {
        expect(moedaReal.formataMoeda()).toBe(arg0)
      }
    )
  })

  test('O valor 1.999999999999 deve retornar R$ 2,00', ({
    given,
    when,
    then
  }) => {
    let input: number
    let moedaReal: MoedaReal

    given(/^que recebi um valor (\d.*)$/, (arg0) => {
      input = parseFloat(arg0)
    })

    when('eu crio uma instancia de MoedaReal', () => {
      moedaReal = new MoedaReal(input)
    })

    then(
      /^chamo o método formataMoeda e deveria receber o valor "(.*)"$/,
      (arg0) => {
        expect(moedaReal.formataMoeda()).toBe(arg0)
      }
    )
  })

  test('O valor 1000 deve retornar R$ 1.000,00', ({ given, when, then }) => {
    let input: number
    let moedaReal: MoedaReal

    given(/^que recebi um valor (\d+)$/, (arg0) => {
      input = parseFloat(arg0)
    })

    when('eu crio uma instancia de MoedaReal', () => {
      moedaReal = new MoedaReal(input)
    })

    then(
      /^chamo o método formataMoeda e deveria receber o valor "(.*)"$/,
      (arg0) => {
        expect(moedaReal.formataMoeda()).toBe(arg0)
      }
    )
  })

  test('O valor 10000 deve retornar R$ 10.000,00', ({ given, when, then }) => {
    let input: number
    let moedaReal: MoedaReal

    given(/^que recebi um valor (\d+)$/, (arg0) => {
      input = parseFloat(arg0)
    })

    when('eu crio uma instancia de MoedaReal', () => {
      moedaReal = new MoedaReal(input)
    })

    then(
      /^chamo o método formataMoeda e deveria receber o valor "(.*)"$/,
      (arg0) => {
        expect(moedaReal.formataMoeda()).toBe(arg0)
      }
    )
  })

  test('O valor 100000 deve retornar R$ 100.000,00', ({ given, when, then }) => {
    let input: number
    let moedaReal: MoedaReal

    given(/^que recebi um valor (\d+)$/, (arg0) => {
      input = parseFloat(arg0)
    })

    when('eu crio uma instancia de MoedaReal', () => {
      moedaReal = new MoedaReal(input)
    })

    then(
      /^chamo o método formataMoeda e deveria receber o valor "(.*)"$/,
      (arg0) => {
        expect(moedaReal.formataMoeda()).toBe(arg0)
      }
    )
  })

  test('O valor 1000000 deve retornar R$ 1.000.000,00', ({ given, when, then }) => {
    let input: number
    let moedaReal: MoedaReal

    given(/^que recebi um valor (\d+)$/, (arg0) => {
      input = parseFloat(arg0)
    })

    when('eu crio uma instancia de MoedaReal', () => {
      moedaReal = new MoedaReal(input)
    })

    then(
      /^chamo o método formataMoeda e deveria receber o valor "(.*)"$/,
      (arg0) => {
        expect(moedaReal.formataMoeda()).toBe(arg0)
      }
    )
  })
})
