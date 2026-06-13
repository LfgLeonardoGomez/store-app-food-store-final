import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { useDirecciones } from "../hooks/useDirecciones"
import { Button } from "../../../shared/components/ui/Button"
import { useDireccionesMutations } from "../hooks/useDireccionesMutations"
import type { DireccionEntrega } from "../types/types"
import { DireccionesModal } from "../components/DireccionesModal"
import { Modal } from "../../../shared/components/ui/Modal"



export default function MisDireccionesPage() {

    const queryClient = useQueryClient()
    const [modalOpen, setModalOpen] = useState(false)

    const { data: direccionesData, isLoading: loadingDirecciones } = useDirecciones()
    const { eliminarDireccion } = useDireccionesMutations()
    const [direccionEditar, setDireccionEditar] = useState<DireccionEntrega | undefined>()
    const direcciones = direccionesData?.data ?? []
    const [confirmOpen, setConfirmOpen] = useState(false)
    const [direccionAEliminar, setDireccionAEliminar] = useState<number | null>(null)
    
    const handleEditar = (dir: DireccionEntrega) => {
    setDireccionEditar(dir)
    setModalOpen(true)
    }

    const handleEliminar = (id: number) => {
  setDireccionAEliminar(id)
  setConfirmOpen(true)
}

    const confirmarEliminar = () => {
    if (direccionAEliminar) {
        eliminarDireccion.mutate(direccionAEliminar, {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['direcciones'] })
            setConfirmOpen(false)
            setDireccionAEliminar(null)
        }
        })
    }
    }

    return (
        <div className="min-h-screen bg-surface p-4">
            <div className="max-w-2xl mx-auto"> 
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Mis Direcciones</h1>
                    <Button variant="primary" onClick={() => setModalOpen(true)}>
                        Agregar Dirección
                    </Button>
                </div>
                {loadingDirecciones ? (
                    <p>Cargando direcciones...</p>
                    ) : direcciones.length === 0 ? (
                    <p>No tenés direcciones guardadas.</p>
                    ) : (
                    <div className="flex flex-col gap-4">
                        {direcciones.map((dir) => (
                        <div key={dir.id} className="bg-background rounded-card shadow-card p-5 flex justify-between items-center">
                            <div className="flex flex-col gap-1">
                            <span className="font-bold text-text-primary">{dir.alias}</span>
                            <span className="text-text-secondary text-sm">{dir.linea_1}, {dir.ciudad}</span>
                            {dir.es_principal && (
                                <span className="text-xs text-primary font-medium">Principal</span>
                            )}
                            </div>
                            <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditar(dir)}>
                                Editar
                            </Button>
                            <Button variant="danger" size="sm" onClick={() => handleEliminar(dir.id)}>
                                Eliminar
                            </Button>
                            </div>
                        </div>
                        ))}
                        </div>
            
                )}
                <DireccionesModal
                    isOpen={modalOpen}
                    onClose={() => {
                        setModalOpen(false)
                        setDireccionEditar(undefined) // Limpiar para la próxima vez
                    }}
                    initialData={direccionEditar}
                    onSuccess={() => {
                        queryClient.invalidateQueries({ queryKey: ['direcciones'] })
                        setModalOpen(false)
                        setDireccionEditar(undefined)
                    }}
                    />
                
                <Modal
                    isOpen={confirmOpen}
                    onClose={() => setConfirmOpen(false)}
                    title="¿Eliminar dirección?"
                    >
                    <div className="flex flex-col gap-4">
                        <p className="text-text-secondary">
                        ¿Estás seguro de que querés eliminar esta dirección? Esta acción no se puede deshacer.
                        </p>
                        <div className="flex gap-3 justify-end">
                        <Button variant="outline" size="sm" onClick={() => setConfirmOpen(false)}>
                            Cancelar
                        </Button>
                        <Button variant="danger" size="sm" onClick={confirmarEliminar} disabled={eliminarDireccion.isPending}>
                            Eliminar
                        </Button>
                        </div>
                    </div>
                    </Modal>

            </div>        
        </div>
)
}