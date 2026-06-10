import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { pedidoService } from '../service/pedidoService';
import type { PedidoCreate } from '../types/types';

export const useDirecciones = () => {
    return useQuery({
    queryKey: ['direcciones'],
    queryFn: () => pedidoService.listarDirecciones(),
    });
};
export const useCrearPedido = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (pedido: PedidoCreate) => pedidoService.crear(pedido),
        onSuccess: ()=> {
            queryClient.invalidateQueries({ queryKey: ['mis-pedidos'] })
        }
    });
};

export const useMisPedidos = () => {
    return useQuery({
        queryKey: ["mis-pedidos"],
        queryFn: ()=> pedidoService.listarMisPedidos(),
    })
}