


export interface PagoCreateRequest {
    pedido_id: number;
}

export interface PagoPublic {
    id: number;
    pedido_id: number;
    monto: number;
    estado: string;
    mp_preference_id: string | null;
    mp_init_point: string | null;
    mp_status: string | null;
    created_at: string;
}

export interface ConfirmPagoRequest {
    pedido_id: number;
    payment_id?: number;
}

export interface PagoEstadoResponse {
    pago_id: number;
    pedido_id: number;
    mp_status: string;
    mp_payment_id: number | null;
}