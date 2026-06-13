
type ModalProps = {
    title: string,
    children: React.ReactNode,
    isOpen: boolean,
    onClose: () => void
}

export const Modal = ({title, children, isOpen, onClose}: ModalProps) => {
    if(!isOpen) return null;

    return (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Fondo oscuro semitransparente */}
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            
            {/* Card blanca */}
            <div className="relative bg-white rounded-lg shadow-xl p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
                </div>
                
                <div>{children}</div>
            </div>
            </div>
    )
}