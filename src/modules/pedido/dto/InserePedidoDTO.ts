import { CustomError, CustomErrorType } from '../../../utils/customError'
import { CPF as CPFVO } from '../../common/value-objects/CPF'
import { ProdutoDoPedido } from '../model/Produto'

export class InserePedidoDTO {
  private readonly _CPF: CPFVO | null
  constructor (
    CPF: string | null,
    readonly produtosPedido: ProdutoDoPedido[]
  ) {
    this._CPF = CPF ? new CPFVO(CPF) : null
    this.validaDTO()
  }

  public get CPF (): string | null {
    return this._CPF?.valor ?? null
  }

  private validaItemDePedido (): boolean {
    if (!this.produtosPedido) return false
    if (this.produtosPedido.length === 0) return false
    if (this.produtosPedido.some((item) => {
      return typeof item.codigo !== 'number' || item.codigo <= 0
    })) return false
    return true
  }

  public validaDTO (): void {
    const erros: String[] = []
    if (!this.validaItemDePedido()) erros.push('Um ou mais itens do pedido é inválido')
    if (erros.length > 0) {
      throw new CustomError(CustomErrorType.InvalidInput, erros.join('\n'))
    }
  }
}
