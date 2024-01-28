import { defineFeature, loadFeature } from "jest-cucumber";
import { CPF } from "../CPF";

const feature = loadFeature(`${__dirname}/features/CPF.feature`);

defineFeature(feature, (test) => {
  test("Criando um cpf", ({ given, when, then }) => {
    let cpfString: string;
    let cpf: CPF;

    given(/^que recebi um cpf (\d+)$/, (arg0) => {
      cpfString = arg0;
    });

    when("eu crio uma instancia do CPF", () => {
      cpf = new CPF(cpfString);
    });

    then(
      /^chamo o método formatCPF e deveria receber um valor formatado "(.*)"$/,
      (arg0) => {
        expect(cpf.formataCPF()).toBe(arg0);
      },
    );
  });

  test("Criando um cpf sem informar nenhum valor", ({ given, when, then }) => {
    let caller: any;

    given("que não recebi nenhum cpf", () => { });

    when("eu crio uma instancia do CPF", () => {
      // @ts-expect-error
      caller = () => new CPF();
    });

    then(/^deveria receber um erro "(.*)"$/, (arg0) => {
      expect(caller).toThrowError(arg0);
    });
  });

  test("O CPF nulo deve retornar erro", ({ given, when, then }) => {
    let caller: any;

    given("que recebi cpf nulo null", () => { });

    when("eu crio uma instancia do CPF", () => {
      // @ts-expect-error
      caller = () => new CPF();
    });

    then(/^deveria receber um erro "(.*)"$/, (arg0) => {
      expect(caller).toThrowError(arg0);
    });
  });

  test("O CPF de tamanho 0 deve retornar erro", ({ given, when, then }) => {
    let cpfString: string;
    let caller: any;

    given('que recebi cpf ""', () => {
      cpfString;
    });

    when("eu crio uma instancia do CPF", () => {
      caller = () => new CPF("");
    });

    then(/^deveria receber um erro "(.*)"$/, (arg0) => {
      expect(caller).toThrowError(arg0);
    });
  });

  test("O CPF de tamanho 10 deve retornar erro", ({ given, when, then }) => {
    let cpfString: string;
    let caller: any;

    given(/^que recebi cpf "(.*)"$/, (arg0) => { cpfString = arg0 });

    when("eu crio uma instancia do CPF", () => {
      caller = () => new CPF(cpfString)
    });

    then(/^deveria receber um erro "(.*)"$/, (arg0) => {
      expect(caller).toThrowError(arg0);
    });
  });

  test("O CPF de tamanho 12 deve retornar erro", ({ given, when, then }) => {
    let cpfString: string;
    let caller: any;

    given(/^que recebi cpf "(.*)"$/, (arg0) => { cpfString = arg0 });

    when("eu crio uma instancia do CPF", () => {
      caller = () => new CPF(cpfString)
    });

    then(/^deveria receber um erro "(.*)"$/, (arg0) => {
      expect(caller).toThrowError(arg0);
    });
  });
});
