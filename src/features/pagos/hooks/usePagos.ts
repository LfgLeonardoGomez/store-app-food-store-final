


import { useMutation } from '@tanstack/react-query';
import { pagoService } from '../service/pagoService';

export const usePagos = () => {
    const crearPreferencia = useMutation({
    mutationFn: pagoService.crearPreferencia,
    });

    const confirmarPago = useMutation({
    mutationFn: pagoService.confirmarPago,
    });

    return { crearPreferencia, confirmarPago };
};
