import api from '../../../shared/axios';
import type { PagoCreateRequest, PagoPublic, ConfirmPagoRequest, PagoEstadoResponse } from '../types/types';

export const pagoService = {
    
    crearPreferencia: async (data: PagoCreateRequest): Promise<PagoPublic> => {
    const { data: response } = await api.post('/pagos/create-preference', data);
    return response;
    },

    confirmarPago: async (data: ConfirmPagoRequest): Promise<PagoEstadoResponse> => {
    const { data: response } = await api.post('/pagos/confirm', data);
    return response;
    },
};