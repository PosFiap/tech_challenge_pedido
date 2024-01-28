import { PrismaPedidoRepositoryGateway } from "../PedidoRepository"
import { prismaMock } from "../../../prisma/mockClient"
import { Pedido } from "../../../modules/pedido/model/Pedido"

const makeSut = () => ({
  sut: new PrismaPedidoRepositoryGateway()
})

describe('PrismaPedidoRepositoryGateway', () => {
  describe('listaPedidos', () => {
    it('Should be received a empty list', async () => {
      const {sut} = makeSut()

      prismaMock.pedido.create.mockResolvedValue(null)
      const result = await sut.registraPedido(new Pedido(undefined, [], 1))

      expect(result).resolves.toEqual(null)
    })
  })
})
