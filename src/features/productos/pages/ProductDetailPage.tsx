import { useParams, Link } from 'react-router-dom'
import { useProductos } from '../hooks/useProductos'
import { Button } from '../../../shared/components/ui/Button'
import { Badge } from '../../../shared/components/ui/Badge'
import { useState } from 'react'
import { Minus, Plus, ArrowLeft } from 'lucide-react'
import { useCartStore } from '../../../store/useCartStore'
import { toast } from 'sonner'




export default function ProductDetailPage() {
const {id} = useParams()
const {producto, isLoadingDetalle, isErrorDetalle} = useProductos({id:Number(id)})
const items = useCartStore((state) => state.items)
const itemEnCarrito = items.find(item => item.id === producto?.id)
const cantidadEnCarrito = itemEnCarrito?.cantidad ?? 0
const maxCantidad = producto?.stock_cantidad ?? 0
const [cantidad, setCantidad] = useState(1)
const addItem = useCartStore((state)=>state.addItem)
const puedeAgregar = (cantidadEnCarrito + cantidad)<= (producto?.stock_cantidad ?? 0)

    if (isLoadingDetalle) return <div>Cargando...</div>
    if (isErrorDetalle) return <div>Error</div>
    if (!producto) return <div>Producto no encontrado</div>

    return (
        <div className = 'bg-surface py-8 md:py-12'>
            <div className = "max-w-5xl mx-auto px-6 py-2 md:py-4">
                <div className = "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
                        
                    <div className="relative aspect-[4/5] md:aspect-square max-h-[380px] md:max-h-[420px] rounded-xl overflow-hidden bg-surface shadow-sm mx-auto">
                        {producto.imagen_url ? (
                            <img src={producto.imagen_url} alt={producto.nombre} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-text-muted text-lg">
                            Sin imagen
                            </div>
                        )}
                    </div>

                    <div className= "flex flex-col gap-3 md:gap-4 text-center md:text-left">
                        <h1 className="text-xl md:text-2xl font-semibold text-text-primary tracking-tight">{producto.nombre}</h1>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                        {producto.categorias.map((cat) => (
                            <Badge key={cat.id} variant="primary">{cat.nombre}</Badge>
                        ))}
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed max-w-prose mx-auto md:mx-0">{producto.descripcion || 'Sin descripción'}</p>
                        <div className="text-xl font-semibold text-primary">${parseFloat(producto.precio_base)}
                        </div>

                        <div className="flex items-center gap-4 justify-center md:justify-start">
                        <span className="text-text-secondary text-sm">Cantidad:</span>
                        <div className="flex items-center border border-border rounded-md h-10">
                            <button onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                                disabled = {cantidad <= 1}
                                className="w-10 h-10 flex items-center justify-center hover:bg-surface transition-colors">
                            <Minus size={18} />
                            </button>
                            <span className="w-10 text-center font-medium text-sm">{cantidad}</span>
                            <button onClick={() => setCantidad(Math.max(1,cantidad + 1))}
                                    disabled ={cantidad >= maxCantidad}
                                    className="w-10 h-10 flex items-center justify-center hover:bg-surface transition-colors">
                            <Plus size={18} />
                            </button>
                        </div>
                        </div>
                        
                        {cantidad >= maxCantidad && maxCantidad > 0 && (
                        <p className="text-xs text-danger">Límite de stock alcanzado</p>
                        )}

                        <Button 
                            variant="primary" 
                            size="md" 
                            className="w-full h-10 text-xs font-medium tracking-wide uppercase"
                            disabled={producto.stock_cantidad===0 || cantidadEnCarrito >= producto.stock_cantidad}
                            onClick={() => {
                                if (!puedeAgregar) {
                                    toast.error('No hay stock suficiente. Solo quedan ' + producto.stock_cantidad + ' unidades.')
                                    return
                                }
                                // Agregar al carrito 'cantidad' veces
                                for (let i = 0; i < cantidad; i++) {
                                addItem({
                                    id: producto.id,
                                    nombre: producto.nombre,
                                    descripcion: producto.descripcion || '',
                                    precio: parseFloat(producto.precio_base),
                                    imagen: producto.imagen_url || undefined,
                                }, producto.stock_cantidad)
                                }
                                toast.success(`${cantidad}x ${producto.nombre} agregado al carrito`)
                            }}
                            >   {producto.stock_cantidad===0
                                ? 'Sin stock'
                                : `Agregar al carrito — $${parseFloat(producto.precio_base) * cantidad}`}
                            </Button>

                            <Link to="/" className="inline-flex items-center justify-center gap-2 text-xs text-text-muted hover:text-text-secondary transition-colors">
                                <ArrowLeft size={16} />
                                Volver a la tienda
                                </Link>

                    </div>

                </div>
            </div>
        </div>

    )
}
