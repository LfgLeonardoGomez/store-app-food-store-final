import { useMutation, useQueryClient } from '@tanstack/react-query';
import { pedidoService } from '../../pedidos/service/pedidoService';
import type { PedidoCreate } from '../../pedidos/types/types';

export const useCheckout = () => {
    
        const queryClient = useQueryClient()
        const crearPedido = useMutation({
            mutationFn: (pedido: PedidoCreate) => pedidoService.crear(pedido),
            onSuccess: ()=> {
                queryClient.invalidateQueries({ queryKey: ['mis-pedidos'] })
            }
        });
        return {crearPedido};
    };




