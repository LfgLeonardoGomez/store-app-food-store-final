import { useQuery } from '@tanstack/react-query';
import api from '../../../shared/axios';
import type { CategoriaList } from '../types';

export const useCategorias = () => {
    return useQuery<CategoriaList>({
        queryKey: ['categorias'],
        queryFn: async () => {
            const { data } = await api.get('/categorias');
            return data;
        },
    });
};