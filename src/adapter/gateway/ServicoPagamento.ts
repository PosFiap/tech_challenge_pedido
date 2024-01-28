import { IHttp } from "../../modules/pedido";
import { Pedido } from "../../modules/pedido/model/Pedido";

export class FaturaService {
  constructor(
    private readonly httpClient: IHttp
  ) {}

  async enviarPedidoParaFatura (pedido: Pedido) {
    const response = await this.httpClient.request({
      host: process.env.FATURA_SERVICE as string,
      method: 'POST',
      body: {
        codigo_pedido: pedido.codigo,
        valor_pedido: pedido.valorTotal
      }
    })

    return ''
  }
}
