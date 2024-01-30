import { CustomError } from '../../../../../utils'
import { CPF } from './../CPF'

describe('Testa o objeto de valor CPF', () => {
  it('O CPF 00000000000 deve retornar 000.000.000-00', () => {
    const cpf = new CPF('00000000000')
    expect(cpf.formataCPF()).toBe('000.000.000-00')
  })

  it("O CPF inválido deve retornar erro com mensagem 'O CPF é inválido'", () => {
    // @ts-expect-error
    expect(() => new CPF()).toThrowError('O CPF é inválido')
  })

  it('O CPF nulo deve retornar erro', () => {
    try {
      // @ts-expect-error
      console.log(new CPF())
    } catch (err) {
      expect(err).toBeInstanceOf(CustomError)
    }
  })

  it('O CPF de tamanho 0 (inválido) deve retornar erro', () => {
    try {
      console.log(new CPF(''))
    } catch (err) {
      expect(err).toBeInstanceOf(CustomError)
    }
  })

  it('O CPF de tamanho 10 (inválido) deve retornar erro', () => {
    try {
      console.log(new CPF('0000000000'))
    } catch (err) {
      expect(err).toBeInstanceOf(CustomError)
    }
  })

  it('O CPF de tamanho 12 (inválido) deve retornar erro', () => {
    try {
      console.log(new CPF('000000000000'))
    } catch (err) {
      expect(err).toBeInstanceOf(CustomError)
    }
  })
})
