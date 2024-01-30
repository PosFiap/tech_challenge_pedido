import { Router } from "express";
import { CustomError } from "../../utils/customError";
import { customErrorToResponse } from "./error-parser";
import { IPedidoController } from "../controller/interfaces/IPedidoController";
import { IPedidoRepositoryGateway } from "../../modules/pedido";
import { PedidoDetalhadoPresenterFactory } from "../presenter/implementations/PedidoDetalhadoPresenterFactory";

export class PedidoHTTP {
    private router: Router;

    constructor(
        private readonly pedidoController: IPedidoController,
        private readonly defaultPedidoRepositoryGateway: IPedidoRepositoryGateway
    ){
        this.router = Router();
        this.setRoutes();
    };

    private setRoutes() {
        this.router.post('/', async (req, res) => { 
            const { CPF, itemDePedido} = req.body;
            try{
                const registraPedidoInput = {
                    cpf: (typeof CPF === 'number' ? CPF.toString() : CPF) || null,
                    produtoPedido: itemDePedido,
                };
                const pedido = await this.pedidoController.registraPedido(
                    registraPedidoInput,
                    this.defaultPedidoRepositoryGateway,
                );

                const pedidoDetalhado = PedidoDetalhadoPresenterFactory.create(
                    pedido.codigoPedido,
                    pedido.produtos,
                    pedido.dataPedido,
                    pedido.cpf?.valor
                  ).format();

                res.status(201).json(pedidoDetalhado);
            } catch (err) {
                if( err instanceof CustomError) {
                    customErrorToResponse(err, res);
                    return;
                }
                res.status(500).json({
                    mensagem: 'Falha ao registrar o pedido'
                });
            }
        });
        
        this.router.get('/', async (req, res) => {
            try{
                const listaPedidos = (await this.pedidoController.listaPedidos(this.defaultPedidoRepositoryGateway)).pedidos;

                const pedidoDetalhados = listaPedidos.map((pedido) => {
                    return PedidoDetalhadoPresenterFactory.create(
                        pedido.codigoPedido,
                        pedido.produtos,
                        pedido.dataPedido,
                        pedido.cpf?.valor
                      ).format();
                });

                res.status(200).json(pedidoDetalhados);
            } catch (err) {
                console.error(err);
                res.status(500).json({
                    mensagem: 'Falha ao recuperar os pedidos'
                });
            }
        });

        this.router.get('/:id', async (req, res) => {
            try{
                const pedido = (await this.pedidoController.listaPedido(this.defaultPedidoRepositoryGateway, parseInt(req.params.id)));

                if (pedido === null) {
                    return res.status(404).json({ message: 'not found!' })
                }

                const pedidoDetalhado = PedidoDetalhadoPresenterFactory.create(
                        pedido.codigoPedido,
                        pedido.produtos,
                        pedido.dataPedido,
                        pedido.cpf?.valor
                      ).format();

                res.status(200).json(pedidoDetalhado)
            } catch (err) {
                console.error(err);
                res.status(500).json({
                    mensagem: 'Falha ao recuperar o pedido'
                });
            }
        });
    }

    getRouter() {
        return this.router;
    }
}
