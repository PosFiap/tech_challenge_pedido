import { Router } from 'express'
import { PedidoHTTP } from '../../adapter/http/pedido'
import { PedidoController } from '../../adapter/controller/PedidoController'
import { PrismaPedidoRepositoryGateway } from '../../adapter/persistence/PedidoRepository'

const router: Router = Router()

const pedidoHTTP = new PedidoHTTP(
  PedidoController.create(),
  new PrismaPedidoRepositoryGateway()
)

router.use('/health', (_req, res) => res.sendStatus(200))
router.use('/pedido', pedidoHTTP.getRouter())

export { router }
