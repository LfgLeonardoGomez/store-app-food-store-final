import { Badge } from '../../../shared/components/ui/Badge'
import { Button } from '../../../shared/components/ui/Button'
import { useCartStore } from '../../../store/useCartStore'
import {toast} from 'sonner'
import {Link} from 'react-router-dom'


interface ProductCardProps {
    id: string | number
    nombre: string
    descripcion: string
    precio: number
    imagen?: string
    categoria?: string
    badge?: string
    stock_cantidad: number
    className?: string
}

const cardClasses = 'bg-background rounded-card shadow-card hover:shadow-card-hover transition-shadow duration-200 overflow-hidden group '
const divImageClasses = 'relative aspect-[4/3] overflow-hidden bg-surface'
const imageClasses = 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-300'



export const ProductCard = ({ id, nombre, descripcion, precio, imagen,
    categoria, badge,stock_cantidad, className = ""
}: ProductCardProps) => {
    // consulta los items del carrito
const items = useCartStore((state) => state.items)
    const itemEnCarrito = items.find(item => item.id === id)
    const cantidadEnCarrito = itemEnCarrito?.cantidad ?? 0
    const puedeAgregar = cantidadEnCarrito < stock_cantidad

    const addItem = useCartStore((state) => state.addItem)
    const badgeText = badge || categoria

    const handleAddToCart = () => {
        if(!puedeAgregar){
            toast.error('No hay stock disponible')
            return
        }
        addItem({ id, nombre, descripcion, precio, imagen },stock_cantidad)
        toast.success('Producto agregado al carrito')
    }

    return (
        <Link to={`/productos/${id}`} className="block">
        <article className={`${cardClasses} ${className}`}>
            <div className={divImageClasses}>
                {imagen ? (
                    <img src={imagen} alt={nombre} className={imageClasses} />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted">
                        Sin imagen
                    </div>
                )}
                {badge && (
                    <Badge variant="primary" className="absolute top-3 left-3">
                        {badgeText}
                    </Badge>
                )}
            </div>

            {/* info */}
            <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-text-primary">{nombre}</h3>
                <p className="text-sm text-text-secondary flex-1">{descripcion}</p>
                <div className="flex items-center justify-between mt-2">
                    <span className="text-lg font-bold text-primary">${precio}</span>
                    <Button 
                    variant="primary" 
                    size="sm" 
                    disabled={!puedeAgregar || stock_cantidad === 0}
                    className={!puedeAgregar ? 'opacity-50 cursor-not-allowed' : ''}
                    onClick={(e)=>{
                        e.preventDefault()
                        e.stopPropagation()
                        handleAddToCart()
                    }}>
                        {stock_cantidad === 0 ? 'Sin stock' : 'Agregar'}
                    </Button>
                </div>
            </div>
        </article>
        </Link>
    )
}




