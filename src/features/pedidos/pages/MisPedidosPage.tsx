import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useMisPedidos } from '../hooks/useMisPedidos'
import { useOrderStatusWS, type IWsEvent } from '../hooks/useOrderStatusWS'
import { Button } from '../../../shared/components/ui/Button'
import { pedidoService } from '../service/pedidoService'
import { ESTADO_LABELS, ESTADO_COLORS, type EstadoPedido, type PedidoPublic, PAGO_ESTADO_LABELS, PAGO_ESTADO_COLORS } from '../types/types'

const FORMA_PAGO_LABELS: Record<string, string> = {
    EFECTIVO: 'Efectivo',
    MERCADOPAGO: 'Mercado Pago',
    TRANSFERENCIA: 'Transferencia',
}

const ESTADOS_ACTIVOS: EstadoPedido[] = ['PENDIENTE', 'CONFIRMADO', 'EN_PREP', 'LISTO']
const PASOS: EstadoPedido[] = ['PENDIENTE', 'CONFIRMADO', 'EN_PREP', 'LISTO', 'ENTREGADO']

const ESTADOS_CANCELABLES: EstadoPedido[] = ['PENDIENTE', 'CONFIRMADO']

const WS_ESTADO_MAP: Partial<Record<string, EstadoPedido>> = {
    PEDIDO_CONFIRMADO:'CONFIRMADO',
    PEDIDO_EN_PREPARACION:'EN_PREP',
    PEDIDO_LISTO:'LISTO',
    PEDIDO_CANCELADO:'CANCELADO',
    PEDIDO_ENTREGADO:'ENTREGADO',
}

function PedidoActivoCard({ pedido, estadoActual, onCancelar, cancelando }: { pedido: PedidoPublic; estadoActual: EstadoPedido, onCancelar: () => void, cancelando: boolean }) {
    const [confirmar, setConfirmar] = useState(false)
    const cancelable= ESTADOS_CANCELABLES.includes(estadoActual)
    const cancelado = estadoActual === 'CANCELADO'
    const pasoActual = PASOS.indexOf(estadoActual)

    return (
        <div className="bg-background rounded-card shadow-card p-5 mb-6 border-l-4 border-primary">
            <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-text-primary text-lg">Pedido actual — #{pedido.id}</span>
                <div className="flex items-center gap-2">
                    {pedido.estado_pago && (
                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${PAGO_ESTADO_COLORS[pedido.estado_pago] ?? 'bg-gray-100 text-gray-600'}`}>
                            {PAGO_ESTADO_LABELS[pedido.estado_pago] ?? pedido.estado_pago}
                        </span>
                    )}
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${ESTADO_COLORS[estadoActual]}`}>
                        {ESTADO_LABELS[estadoActual]}
                    </span>
                </div>
            </div>

            {cancelado ? (
                <p className="text-sm text-red-600 font-medium">Tu pedido fue cancelado.</p>
            ) : (
                <div className="flex items-center mt-2 mb-4">
                    {PASOS.map((paso, i) => {
                        const completado = i < pasoActual
                        const actual = i === pasoActual
                        return (
                            <div key={paso} className="flex items-center flex-1 min-w-0">
                                <div className="flex flex-col items-center shrink-0">
                                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-colors
                                        ${completado ? 'bg-primary border-primary text-white' :
                                        actual     ? 'bg-primary/20 border-primary text-primary' :
                                                        'bg-surface border-border text-text-muted'}`}>
                                        {completado ? '✓' : i + 1}
                                    </div>
                                    <span className={`text-[10px] mt-1 text-center leading-tight
                                        ${actual ? 'text-primary font-semibold' : 'text-text-muted'}`}>
                                        {ESTADO_LABELS[paso]}
                                    </span>
                                </div>
                                {i < PASOS.length - 1 && (
                                    <div className={`h-0.5 flex-1 mx-1 mb-4 ${completado ? 'bg-primary' : 'bg-border'}`} />
                                )}
                            </div>
                        )
                    })}
                </div>
            )}

            <div className="border-t border-border pt-3 flex justify-between text-sm">
                <span className="text-text-secondary">
                    {FORMA_PAGO_LABELS[pedido.forma_pago_codigo] ?? pedido.forma_pago_codigo}
                </span>
                <span className="font-bold text-primary">Total: ${pedido.total}</span>
            </div>

            {cancelable && !cancelado && (
                <div className="mt-4 border-t border-border pt-3">
                    {!confirmar ? (
                        <Button variant="danger" size="sm" onClick={() => setConfirmar(true)}>
                            Cancelar pedido
                        </Button>
                    ) : (
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-text-secondary">¿Confirmás la cancelación?</span>
                        <Button
                            variant="danger"
                            size="sm"
                            disabled={cancelando}
                            onClick={() => { onCancelar(); setConfirmar(false) }}
                            >
                        {cancelando ? 'Cancelando...' : 'Sí, cancelar'}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setConfirmar(false)}>
                            No, volver
                        </Button>
                    </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default function MisPedidosPage() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()
    const { data, isLoading, isError } = useMisPedidos()

    const pedidos = data?.data ?? []
    const activeOrder = pedidos.find(p => ESTADOS_ACTIVOS.includes(p.estado_codigo as EstadoPedido))

    const [activeEstado, setActiveEstado] = useState<EstadoPedido | null>(null)

    useEffect(() => {
        setActiveEstado(activeOrder ? activeOrder.estado_codigo as EstadoPedido : null)
    }, [activeOrder?.id])

    const cancelarMutation = useMutation({
        mutationFn: (pedidoId: number) =>
            pedidoService.cancelar(pedidoId),
            onSuccess: ()=> {
                setActiveEstado("CANCELADO")
                queryClient.invalidateQueries({queryKey: ['mis-pedidos'] })
            },
    })

    const handleWsMessage = useCallback((msg: IWsEvent) => {
        const newEstado = WS_ESTADO_MAP[msg.event]
        if (newEstado) {
            setActiveEstado(newEstado)
            queryClient.invalidateQueries({ queryKey: ['mis-pedidos'] })
        }
    }, [queryClient])

    const { subscribeToOrder, isConnected } = useOrderStatusWS({
        enabled: !!activeOrder,
        onMessage: handleWsMessage,
    })

    useEffect(() => {
        if (isConnected && activeOrder) {
            subscribeToOrder(activeOrder.id)
        }
    }, [isConnected, activeOrder?.id])

    if (isLoading) {
        return (
            <div className="min-h-screen bg-surface flex items-center justify-center">
                <p className="text-text-secondary">Cargando pedidos...</p>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-4">
                <p className="text-text-secondary">No se pudieron cargar los pedidos.</p>
                <Button variant="primary" onClick={() => navigate('/')}>Volver al inicio</Button>
            </div>
        )
    }

    const historial = pedidos.filter(p => p.id !== activeOrder?.id)

    return (
        <div className="min-h-screen bg-surface">
            <div className="max-w-3xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-text-primary mb-6">Mis pedidos</h1>

                {activeOrder && activeEstado && (
                    <PedidoActivoCard 
                        pedido={activeOrder} 
                        estadoActual={activeEstado}
                        onCancelar= {()=> cancelarMutation.mutate(activeOrder.id)}
                        cancelando= {cancelarMutation.isPending} 
                    />
                )}

                {pedidos.length === 0 ? (
                    <div className="bg-background rounded-card shadow-card p-8 text-center">
                        <p className="text-text-secondary mb-4">Todavía no hiciste ningún pedido.</p>
                        <Button variant="primary" onClick={() => navigate('/')}>Ver productos</Button>
                    </div>
                ) : historial.length > 0 && (
                    <>
                        <h2 className="text-lg font-semibold text-text-secondary mb-3">Historial</h2>
                        <div className="flex flex-col gap-4">
                            {historial.map((pedido) => (
                                <div key={pedido.id} className="bg-background rounded-card shadow-card p-5 flex flex-col gap-3">
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-text-primary">Pedido #{pedido.id}</span>
                                    <div className="flex items-center gap-2">
                                        {pedido.estado_pago && (
                                            <span className={`text-xs font-semibold px-3 py-1 rounded-full ${PAGO_ESTADO_COLORS[pedido.estado_pago] ?? 'bg-gray-100 text-gray-600'}`}>
                                                {PAGO_ESTADO_LABELS[pedido.estado_pago] ?? pedido.estado_pago}
                                            </span>
                                        )}
                                        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${ESTADO_COLORS[pedido.estado_codigo as EstadoPedido]}`}>
                                            {ESTADO_LABELS[pedido.estado_codigo as EstadoPedido]}
                                        </span>
                                    </div>
                                </div>
                                    <div className="flex flex-col gap-1 text-sm text-text-secondary">
                                        <span>Forma de pago: {FORMA_PAGO_LABELS[pedido.forma_pago_codigo] ?? pedido.forma_pago_codigo}</span>
                                        {pedido.notas && <span>Notas: {pedido.notas}</span>}
                                    </div>
                                    <div className="border-t border-border pt-3 flex justify-between text-sm">
                                        <span className="text-text-secondary">Subtotal: ${pedido.subtotal}</span>
                                        <span className="font-bold text-primary">Total: ${pedido.total}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}