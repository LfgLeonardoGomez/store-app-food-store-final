import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { toast } from 'sonner'

interface CartItem {
    id: string | number
    nombre: string
    descripcion: string
    precio: number
    imagen?: string
    cantidad: number
    stock_cantidad: number
}

interface CartState {
    items: CartItem[];
    addItem: (producto: Omit<CartItem, 'cantidad' | 'stock_cantidad'>, stock:number) => void;
    removeItem: (id: string | number) => void;
    updateQuantity: (id: string | number, cantidad: number) => void;
    clearCart: () => void;
    // sincroniza el stock al recargar
    syncStock: (id: string | number, newStock: number) => void;

    totalItems: () => number;      
    totalPrice: () => number;     
    }

export const useCartStore = create<CartState>()(
persist(
    (set, get) => ({
        items: [],
        /*  agrega item al carrito */
        addItem: (producto,stock) => set((state) => {
            const existe = state.items.find(item => item.id === producto.id);
            if (existe) {
                if(existe.cantidad>=stock){
                    return {items: state.items}
                }
                return {
                    items: state.items.map((item) =>
                        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
                    )
                };
            }
            return {
                items: [...state.items, { ...producto, cantidad: 1, stock_cantidad:stock}]
            };
        }),

        /*  elimina item del carrito */
        removeItem: (id) => set((state) => ({
            items: state.items.filter(item => item.id !== id)
        })),
        /*  actualiza la cantidad de un item en el carrito */
        
        updateQuantity: (id, cantidad) => set((state) => ({
        items: cantidad <= 0 
        ? state.items.filter(item => item.id !== id)  // elimina si es 0 o menos
        : state.items.map((item) =>
            item.id === id ? { ...item, cantidad } : item
        )
})),
        /* vacia el carrito */
        clearCart: () => set({ items: [] }),

        /* calcula la cantidad de items */
        totalItems: () => get().items.reduce((total, item) => total + item.cantidad, 0),
        
        /* calcula el precio total del carrito */
        totalPrice: () => get().items.reduce((total, item) => total + (item.precio * item.cantidad), 0),
        syncStock: (id, newStock) => {
            const item = get().items.find(i => i.id === id)
            if (!item) return
            
            if (newStock === 0) {
                set((state) => ({
                    items: state.items.filter(i => i.id !== id)
                }))
                toast.error(`${item.nombre} se eliminó del carrito porque ya no tiene stock`)
                return
            }
            
            set((state) => ({
                items: state.items.map((item) => {
                    if (item.id === id) {
                        const nuevaCantidad = Math.min(item.cantidad, newStock)
                        return { ...item, stock_cantidad: newStock, cantidad: nuevaCantidad }
                    }
                    return item
                })
            }))
        }
    }),
    { name: 'cart-storage' }
)
)