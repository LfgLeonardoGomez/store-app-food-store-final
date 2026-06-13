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



export type EstadoPedido =
    | "PENDIENTE"
    | "CONFIRMADO"
    | "EN_PREP"
    | "LISTO"
    | "ENTREGADO"
    | "CANCELADO"

export const ESTADO_LABELS: Record <EstadoPedido, string> = {
    PENDIENTE: "Pendiente",
    CONFIRMADO: "Confirmado",
    EN_PREP: "En preparacion",
    LISTO: "Listo",
    ENTREGADO: "Entregado",
    CANCELADO: "CANCELADO",
}

export const ESTADO_COLORS: Record <EstadoPedido, string> = {
    PENDIENTE:  'bg-yellow-100 text-yellow-800',
    CONFIRMADO: 'bg-blue-100 text-blue-800',
    EN_PREP:    'bg-orange-100 text-orange-800',
    LISTO:      'bg-green-100 text-green-800',
    ENTREGADO:  'bg-gray-100 text-gray-700',
    CANCELADO:  'bg-red-100 text-red-700',
}

export interface PedidoPublic {
    id: number
    usuario_id: number
    estado_codigo: EstadoPedido
    direccion_id: number
    forma_pago_codigo: string
    descuento: string
    notas?: string | null
    subtotal: string
    costo_envio: string
    total: string
}

export interface PedidoList {
    data: PedidoPublic []
    count: number
}