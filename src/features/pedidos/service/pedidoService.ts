
import api from '../../../shared/axios';
import type { PedidoCreate, PedidoList } from '../types/types';

export const pedidoService = {
    crear: async (pedido: PedidoCreate) => {
    const { data } = await api.post('/pedidos', pedido);
    return data;
    },

    listarMisPedidos: async (): Promise <PedidoList> => {
        const { data } = await api.get("/pedidos/pedidosdelusuario")
        return data
    }
};