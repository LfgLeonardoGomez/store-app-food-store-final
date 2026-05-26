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
const [cantidad, setCantidad] = useState(1)
const addItem = useCartStore((state)=>state.addItem)

    if (isLoadingDetalle) return <div>Cargando...</div>
    if (isErrorDetalle) return <div>Error</div>
    if (!producto) return <div>Producto no encontrado</div>

    return (
        <div className = 'min-h-screen bg-surface'>
            <div className = "max-w-7xl mx-auto px-4 py-8">
                <div className = "grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        
                    <div className="relative aspect-square rounded-2xl overflow-hidden bg-surface shadow-card">
                        {producto.imagen_url ? (
                            <img src={producto.imagen_url} alt={producto.nombre} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-text-muted text-lg">
                            Sin imagen
                            </div>
                        )}
                    </div>

                    <div className= "flex flex-col gap-6">
                        <h1 className="text-3xl lg:text-4xl font-bold text-text-primary">{producto.nombre}</h1>
                        <div className="flex flex-wrap gap-2">
                        {producto.categorias.map((cat) => (
                            <Badge key={cat.id} variant="primary">{cat.nombre}</Badge>
                        ))}
                        </div>
                        <p className="text-text-secondary text-lg leading-relaxed">{producto.descripcion || 'Sin descripción'}</p>
                        <div className="text-3xl font-bold text-primary">${parseFloat(producto.precio_base)}
                        </div>

                        <div className="flex items-center gap-4">
                        <span className="text-text-secondary">Cantidad:</span>
                        <div className="flex items-center border border-border rounded-lg">
                            <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="px-3 py-2 hover:bg-surface">
                            <Minus size={18} />
                            </button>
                            <span className="w-12 text-center font-medium">{cantidad}</span>
                            <button onClick={() => setCantidad(cantidad + 1)} className="px-3 py-2 hover:bg-surface">
                            <Plus size={18} />
                            </button>
                        </div>
                        </div>

                        <Button 
                            variant="primary" 
                            size="lg" 
                            className="w-full py-4 text-lg"
                            onClick={() => {
                                // Agregar al carrito 'cantidad' veces
                                for (let i = 0; i < cantidad; i++) {
                                addItem({
                                    id: producto.id,
                                    nombre: producto.nombre,
                                    descripcion: producto.descripcion || '',
                                    precio: parseFloat(producto.precio_base),
                                    imagen: producto.imagen_url || undefined,
                                })
                                }
                                toast.success(`${cantidad}x ${producto.nombre} agregado al carrito`)
                            }}
                            >
                            Agregar al carrito — ${parseFloat(producto.precio_base) * cantidad}
                            </Button>

                            <Link to="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors">
                                <ArrowLeft size={18} />
                                Volver a la tienda
                                </Link>

                    </div>

                </div>
            </div>
        </div>

    )
}
