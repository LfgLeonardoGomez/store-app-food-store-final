export interface DetallePedidoCreate {
    producto_id: number;
    cantidad: number;
    nombre_snapshot: string;
    precio_snapshot: number;
    subtotal_snapshot?: number;
    personalizacion?: number[][];
}
export interface PedidoCreate {
    direccion_id: number;
    forma_pago_codigo: string;
    descuento: number;
    notas?: string;
    detalles: DetallePedidoCreate[];
}
export interface DireccionEntrega {
    id: number;
}
export interface DireccionEntregaList {
    data: DireccionEntrega[];
    count: number;
}