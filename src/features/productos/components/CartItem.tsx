import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '../../../shared/components/ui/Button'
import { useCartStore } from '../../../store/useCartStore'

interface CartItemProps {
    id: string | number
    nombre: string
    descripcion: string
    precio: number
    imagen?: string
    cantidad: number
}

export const CartItem = ({ id, nombre, descripcion, precio, imagen, cantidad }: CartItemProps) => {
    const updateQuantity = useCartStore((state) => state.updateQuantity)
    const removeItem = useCartStore((state) => state.removeItem)

    return (
        <div className="flex gap-4 bg-background rounded-card p-4 shadow-card">
            {/* Imagen */}
            <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-surface">
                {imagen ? (
                    <img src={imagen} alt={nombre} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-text-muted text-xs">
                        Sin imagen
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="font-semibold text-text-primary">{nombre}</h3>
                    <p className="text-sm text-text-secondary line-clamp-1">{descripcion}</p>
                </div>

                <div className="flex items-center justify-between mt-2">
                    {/* Controles de cantidad */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-8 h-8 p-0"
                            onClick={() => updateQuantity(id, cantidad - 1)}
                        >
                            <Minus size={16} />
                        </Button>
                        <span className="w-8 text-center font-medium text-text-primary">{cantidad}</span>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-8 h-8 p-0"
                            onClick={() => updateQuantity(id, cantidad + 1)}
                        >
                            <Plus size={16} />
                        </Button>
                    </div>

                    {/* Precio + Eliminar */}
                    <div className="flex items-center gap-4">
                        <span className="font-bold text-primary">${precio * cantidad}</span>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-danger hover:bg-danger-light"
                            onClick={() => removeItem(id)}
                        >
                            <Trash2 size={18} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
