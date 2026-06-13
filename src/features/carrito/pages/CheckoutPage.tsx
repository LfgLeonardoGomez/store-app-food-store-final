import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../shared/components/ui/Button'
import { useCartStore } from '../../../store/useCartStore'
import { useDirecciones } from '../../direcciones/hooks/useDirecciones'
import {useCheckout} from '../hooks/useCheckout'
import { toast } from 'sonner'
import { DireccionesModal } from '../../direcciones/components/DireccionesModal'
import { useQueryClient } from '@tanstack/react-query'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [modalOpen, setModalOpen] = useState(false)

  // Estado local del formulario
  const [direccionId, setDireccionId] = useState<number | ''>('')
  const [formaPago, setFormaPago] = useState('EFECTIVO')
  const [notas, setNotas] = useState('')

  // Datos del carrito y backend
  const items = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const { data: direccionesData, isLoading: loadingDirecciones } = useDirecciones()
  const { crearPedido } = useCheckout()

  // Cálculos
  const subtotal = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
  const costoEnvio = 50
  const total = subtotal + costoEnvio

    // Si el carrito está vacío, mostrar mensaje
    if (items.length === 0) {
      return (
        <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-4">
          <p className="text-text-secondary text-lg">Tu carrito está vacío</p>
          <Button variant="primary" className="mt-4" onClick={() => navigate('/')}>
            Ver productos
          </Button>
        </div>
      )
    }

    const handleConfirmar = () => {
      if (!direccionId) {
        toast.error('Seleccioná una dirección de entrega')
        return
      }

      const payload = {
        direccion_id: Number(direccionId),
        forma_pago_codigo: formaPago,
        descuento: 0,
        notas: notas || undefined,
        detalles: items.map((item) => ({
          producto_id: Number(item.id),
          cantidad: item.cantidad,
          nombre_snapshot: item.nombre,
          precio_snapshot: item.precio,
          personalizacion: [] as number[][],
        })),
      }

      crearPedido.mutate(payload, {
        onSuccess: () => {
          toast.success('¡Pedido creado con éxito!')
          clearCart()
          navigate('/')
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.detail || 'Error al crear el pedido')
        },
      })
    }

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-text-primary mb-8">Finalizar compra</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Columna izquierda — Formulario */}
          <div className="bg-background rounded-card shadow-card p-6 flex flex-col gap-6">
            <h2 className="text-xl font-bold text-text-primary">Datos de entrega</h2>

            {/* Dirección */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">
                Dirección de entrega
              </label>
              {loadingDirecciones ? (
                <p className="text-text-muted text-sm">Cargando direcciones...</p>
              ) : (
                <select
                  value={direccionId}
                  onChange={(e) => setDireccionId(Number(e.target.value))}
                  className="border border-border rounded-lg px-4 py-2.5 bg-background text-text-primary focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                >
                  <option value="">Seleccioná una dirección</option>
                  {direccionesData?.data.map((dir:any) => (
                    <option key={dir.id} value={dir.id}>
                      {dir.alias} — {dir.linea_1}, {dir.ciudad}
                    </option>
                  ))}
                </select>
              )}
              <Button variant="outline" size="sm" onClick={() => setModalOpen(true)}>
              Agregar nueva direccion
              </Button>
            </div>

            {/* Forma de pago */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">
                Forma de pago
              </label>
              <select
                value={formaPago}
                onChange={(e) => setFormaPago(e.target.value)}
                className="border border-border rounded-lg px-4 py-2.5 bg-background text-text-primary focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              >
                <option value="EFECTIVO">Efectivo</option>
                <option value="MERCADOPAGO">Mercado Pago</option>
                <option value="TRANSFERENCIA">Transferencia</option>
              </select>
            </div>

            {/* Notas */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-text-secondary">
                Notas (opcional)
              </label>
              <textarea
                value={notas}
                onChange={(e) => setNotas(e.target.value)}
                placeholder="Instrucciones de entrega, timbre, etc."
                rows={3}
                className="border border-border rounded-lg px-4 py-2.5 bg-background text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* Columna derecha — Resumen */}
          <div className="bg-background rounded-card shadow-card p-6 flex flex-col gap-6 h-fit">
            <h2 className="text-xl font-bold text-text-primary">Resumen del pedido</h2>

            {/* Items */}
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-text-secondary">
                    {item.cantidad}x {item.nombre}
                  </span>
                  <span className="font-medium text-text-primary">
                    ${item.precio * item.cantidad}
                  </span>
                </div>
              ))}
            </div>

            {/* Totales */}
            <div className="border-t border-border pt-4 flex flex-col gap-2">
              <div className="flex justify-between text-text-secondary">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Envío</span>
                <span>${costoEnvio}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-primary pt-2 border-t border-border">
                <span>Total</span>
                <span>${total}</span>
              </div>
            </div>

            {/* Botón confirmar */}
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              disabled={!direccionId || crearPedido.isPending}
              onClick={handleConfirmar}
            
            >
              {crearPedido.isPending ? 'Procesando...' : 'Confirmar pedido'}
            </Button>
          </div>
        </div>
      </div>
      {/* Modal para agregar nueva dirección */}
      <DireccionesModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ['direcciones'] })
            setModalOpen(false)
          }}
      />
    </div>
  )
}
