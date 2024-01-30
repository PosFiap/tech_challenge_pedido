import { CPF } from '../../common/value-objects'
import { ProdutoDoPedido } from '../model/Produto'

export class InserePedidoOutputDTO {
  constructor (
    readonly codigo: number,
    readonly valor: number,
    readonly CPF: CPF | null,
    readonly dataPedido: Date,
    readonly itensPedido: ProdutoDoPedido[]
  ) {}
}
