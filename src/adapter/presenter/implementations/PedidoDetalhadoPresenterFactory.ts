import { IPedidoDetalhadoPresenter, IProdutoPedidoDetalhadoPresenter } from "../interfaces/IPedidoDetalhadoPresenter";
import { IPedidoDetalhadoPresenterFactory } from "../interfaces/IPedidoDetalhadoPresenterFactory";
import { PedidoDetalhadoPresenterJSON } from "./PedidoDetalhadoPresenterJSON";

export abstract class PedidoDetalhadoPresenterFactory implements IPedidoDetalhadoPresenterFactory {
    
    // Criada apenas por limitação da linguagem que não reconhece classes estáticas e pede implementação
    create(codigoPedido: number, itensPedido: IProdutoPedidoDetalhadoPresenter[], dataPedido: Date, CPFCliente?: string | undefined): IPedidoDetalhadoPresenter {
        throw new Error("Method not implemented.");
    }
    
    static create(
        codigoPedido: number,
        itensPedido: Array<IProdutoPedidoDetalhadoPresenter>,
        dataPedido: Date,
        CPFCliente?: string,
    ): IPedidoDetalhadoPresenter {
        return new PedidoDetalhadoPresenterJSON(
            codigoPedido,
            itensPedido,
            dataPedido,
            CPFCliente
        )
    }

    
}
