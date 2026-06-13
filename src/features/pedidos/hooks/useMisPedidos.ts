import { useQuery } from '@tanstack/react-query';
import { pedidoService } from '../service/pedidoService';

export const useMisPedidos = () => {
    return useQuery({
        queryKey: ['mis-pedidos'],
        queryFn: () => pedidoService.listarMisPedidos(),
    });
};