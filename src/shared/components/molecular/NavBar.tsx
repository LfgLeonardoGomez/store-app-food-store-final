import { User,ShoppingCart, LogOut, LogIn } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { useCartStore } from '../../../store/useCartStore'
import { useAuthStore } from '../../../store/useAuthStore'
import { authService } from '../../../features/auth/services/authService'
import { toast } from 'sonner'
import { UserSidebar } from '../molecular/UserSidebar'
import { useState } from 'react'

const navClasses = 'sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3'
const divInterno = 'max-w-7xl mx-auto flex items-center justify-between'
const tituloClasses = 'text-xl font-bold text-primary'
const carritoClasses = 'relative p-2 text-text-secondary hover:text-primary transition-colors'

export const NavBar = () => {
    const navigate = useNavigate()
    const count = useCartStore((state) => state.items.reduce((acc, item) => acc + item.cantidad, 0))
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
    const logout = useAuthStore((state) => state.logout)
    const user = useAuthStore((state)=> state.user)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const handleLogout = async () => {
        try {
            await authService.logout()
            logout()
            toast.success('Sesión cerrada')
            navigate('/')
        } catch {
            logout()
            toast.success('Sesión cerrada')
            navigate('/')
        }
    }

    return (
        <>
        <nav className={navClasses}>
            <div className={divInterno}>
                <Link to="/">
                    <span className={tituloClasses}>FoodStore</span>
                </Link>

                <div className="flex items-center gap-2">
                    {isAuthenticated ? (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={()=>setIsSidebarOpen(true)}
                            className="text-text-secondary hover:text-primary"
                        >
                            <User size={20} />
                        
                        </Button>
                    ) : (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-text-secondary hover:text-primary hover:bg-green-50"
                                onClick={()=> navigate('/login')}
                            >
                                <LogIn size={20} />
                                Iniciar sesión
                            </Button>
                    )}

                    <Link to="/cart" className={carritoClasses}>
                        <ShoppingCart size={24} />
                        {count > 0 && (
                            <Badge className="absolute -top-1 -right-1 min-w-[20px] text-center" variant="primary">
                                {count}
                            </Badge>
                        )}
                    </Link>
                </div>
            </div>
        </nav>
        <UserSidebar
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    onLogout={handleLogout}
                    userName={user?.name}
                />
                </>
    )
}