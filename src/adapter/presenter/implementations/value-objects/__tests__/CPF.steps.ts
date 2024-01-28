import { defineFeature, loadFeature } from 'jest-cucumber'
import { CPF } from '../CPF'

const feature = loadFeature(`${__dirname}/features/CPF.feature`)

defineFeature(feature, test => {
  test('Entrando com um cpf invalido', ({ given, when, then }) => {
    let cpf: any

    	given('que recebi um cpf null', () => {
        cpf = null
    	});

    	when('eu crio crio uma instancia do CPF', () => {

    	});

    	then('deveria receber um erro', () => {
        expect(() => new CPF(cpf)).toThrowError("O CPF é inválido")
    	});
    });
})
