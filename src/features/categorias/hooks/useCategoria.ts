import { useQuery } from '@tanstack/react-query';
import api from '../../../shared/axios';
export const useCategorias = () => {
    return useQuery({
        queryKey: ['categorias'],
        queryFn: async () => {
        const { data } = await api.get('/categorias');
        return data;
        },
    });
};