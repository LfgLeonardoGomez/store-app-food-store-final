import { useQuery, useMutation } from '@tanstack/react-query';
import { pedidoService } from '../service/pedidoService';
import type { PedidoCreate } from '../types/types';
export const useDirecciones = () => {
    return useQuery({
    queryKey: ['direcciones'],
    queryFn: () => pedidoService.listarDirecciones(),
    });
};
export const useCrearPedido = () => {
    return useMutation({
    mutationFn: (pedido: PedidoCreate) => pedidoService.crear(pedido),
    });
};