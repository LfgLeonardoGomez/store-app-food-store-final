import { create } from 'zustand'
import { persist } from 'zustand/middleware'


interface CartItem {
    id: string | number
    nombre: string
    descripcion: string
    precio: number
    imagen?: string
    cantidad: number
}

interface CartState {
    items: CartItem[];
    addItem: (producto: Omit<CartItem, 'cantidad'>) => void;
    removeItem: (id: string | number) => void;
    updateQuantity: (id: string | number, cantidad: number) => void;
    clearCart: () => void;
    
    totalItems: () => number;      // cantidad total de unidades
    totalPrice: () => number;      // precio total
    }

export const useCartStore = create<CartState>()(
persist(
    (set, get) => ({
        items: [],
        /*  agrega item al carrito */
        addItem: (producto) => set((state) => {
            const existe = state.items.find(item => item.id === producto.id);
            if (existe) {
                return {
                    items: state.items.map((item) =>
                        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
                    )
                };
            }
            return {
                items: [...state.items, { ...producto, cantidad: 1 }]
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
        totalPrice: () => get().items.reduce((total, item) => total + (item.precio * item.cantidad), 0)
    }),
    { name: 'cart-storage' }
)
)