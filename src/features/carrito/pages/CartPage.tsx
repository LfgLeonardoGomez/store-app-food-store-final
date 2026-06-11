import { Link } from 'react-router-dom'
import { ShoppingCart, ArrowLeft } from 'lucide-react'
import { CartItem } from '../components/CartItem'
import { Button } from '../../../shared/components/ui/Button'
import { useCartStore } from '../../../store/useCartStore'
import { useNavigate } from 'react-router-dom'

export default function CartPage() {
    const navigate = useNavigate()
    const items = useCartStore((state) => state.items)
    const clearCart = useCartStore((state) => state.clearCart)
    const totalPrice = useCartStore((state) => state.totalPrice)
    const total = totalPrice()

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-surface flex flex-col items-center justify-center px-4">
                <ShoppingCart size={64} className="text-text-muted mb-4" />
                <h2 className="text-2xl font-bold text-text-primary mb-2">Tu carrito está vacío</h2>
                <p className="text-text-secondary mb-6">Agregá productos para empezar tu pedido</p>
                <Link to="/">
                    <Button variant="primary">
                        <ArrowLeft size={18} className="mr-2" />
                        Ver productos
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-surface">
            <div className="max-w-3xl mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold text-text-primary">Tu Carrito</h1>
                    <Button variant="ghost" onClick={clearCart} className="text-danger">
                        Vaciar carrito
                    </Button>
                </div>

                {/* Items */}
                <div className="flex flex-col gap-4 mb-8">
                    {items.map((item) => (
                        <CartItem
                            key={item.id}
                            id={item.id}
                            nombre={item.nombre}
                            descripcion={item.descripcion}
                            precio={item.precio}
                            imagen={item.imagen}
                            cantidad={item.cantidad}
                            stock_cantidad={item.stock_cantidad}
                        />
                    ))}
                </div>

                {/* Resumen */}
                <div className="bg-background rounded-card shadow-card p-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-lg text-text-secondary">Total</span>
                        <span className="text-2xl font-bold text-primary">${total}</span>
                    </div>
                    <Button variant="primary" size="lg" className="w-full" onClick={()=> navigate('/checkout')}>
                        Finalizar compra
                    </Button>
                    <Link to="/" className="block text-center mt-4 text-text-secondary hover:text-primary transition-colors">
                        Seguir comprando
                    </Link>
                </div>
            </div>
        </div>
    )
}
