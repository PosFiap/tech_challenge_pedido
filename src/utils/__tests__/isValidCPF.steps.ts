import { defineFeature, loadFeature } from 'jest-cucumber'
import { isValidCPF } from '../isValidCPF'

const feature = loadFeature('./isValidCPF.feature', {
  loadRelativePath: true
})

defineFeature(feature, (test) => {
  const g = (given: any, context: Record<string, any>) => {
    given(/^um cpf informado "(.*)"$/, (cpf: string) => {
      context.cpf = cpf
    })
  }

  const w = (when: any, context: Record<string, any>) => {
    when('fazemos a validação', () => {
      context.isValid = isValidCPF(context.cpf)
    })
  }

  test('Cpf valido deve retornar valor true', ({ given, when, then }) => {
    const context = {
      cpf: null,
      isValid: null
    }

    g(given, context)
    w(when, context)

    then('é retornado o valor true', () => {
      expect(context.isValid).toBeTruthy()
    })
  })

  test('Cpf invalido deve retornar valor false', ({ given, when, then }) => {
    const context = {
      cpf: null,
      isValid: null
    }

    g(given, context)
    w(when, context)

    then('é retornado o valor false', () => {
      expect(context.isValid).toBeFalsy()
    })
  })

  test('Cpf com tamanho diferente de 11 caracteres é invalido e deve retornar valor false', ({
    given,
    when,
    then
  }) => {
    const context = {
      cpf: null,
      isValid: null
    }

    g(given, context)
    w(when, context)

    then('é retornado o valor false', () => {
      expect(context.isValid).toBeFalsy()
    })
  })
})
