import { X, User, Package, MapPin, LogOut } from 'lucide-react'
import { Button } from '../ui/Button'

interface UserSidebarProps {
    isOpen: boolean
    onClose: () => void
    onLogout: () => void
    userName?:string
    onMisPedidos: ()=> void
    onMisDirecciones: ()=> void
}  
export const UserSidebar = ({ isOpen, onClose, onLogout, userName, onMisPedidos, onMisDirecciones}: UserSidebarProps) => {
    if (!isOpen) return null
    const menuItems = [
        { icon: User, label: 'Mi perfil', action: () => alert('Próximamente: Perfil') },
        { icon: Package, label: 'Mis pedidos', action: onMisPedidos },
        { icon: MapPin, label: 'Mis direcciones', action: onMisDirecciones },
    ]
    return (
        <>
            {/* Fondo oscuro semitransparente para que no se pueda interactuar
                con lo que esta atras */}
            <div
                className="fixed inset-0 bg-black/50 z-50"
                onClick={onClose}
            />
            {/* Panel lateral */}
            <div className="fixed right-0 top-0 h-full w-72 bg-background shadow-xl z-50 flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                    <h2 className="text-lg font-bold text-danger">Hola {userName}!!!</h2>
                    <Button variant="ghost" size="sm" onClick={onClose} className="text-text-secondary">
                        <X size={20} />
                    </Button>
                </div>
                {/* Items del menú */}
                <div className="flex flex-col p-2 flex-1">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={item.action}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-surface hover:text-text-primary transition-colors text-left"
                        >
                            <item.icon size={20} />
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}

                    {/* Cerrar sesión */}
                    <div className="mt-auto border-t border-border pt-2">
                        <button
                        onClick={() => {
                            onLogout()
                            onClose()
                        }}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-danger hover:bg-danger/10 transition-colors text-left w-full"
                        >
                            <LogOut size={20} />
                            <span className="font-medium">Cerrar sesión</span>
                        </button>
                    </div>
                    
                        
                </div>
            </div>
        </>
    )
}