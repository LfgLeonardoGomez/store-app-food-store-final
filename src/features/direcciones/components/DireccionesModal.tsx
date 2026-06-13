import { Modal } from "../../../shared/components/ui/Modal";
import { DireccionesForm } from "../components/DireccionesForm";
import { useDireccionesMutations } from "../hooks/useDireccionesMutations";
import type { DireccionEntrega } from "../types/types";



type DireccionModlProps = {
    isOpen: boolean;
    onClose: () => void;
    initialData?: DireccionEntrega;
    onSuccess: () => void;
}

export function DireccionesModal({isOpen, onClose, initialData, onSuccess}: DireccionModlProps) {

    
    const {crearDireccion, actualizarDireccion} = useDireccionesMutations()
    const isEditMode = Boolean(initialData);
    const handleSubmit = (data: Omit<DireccionEntrega, "id">) => {
        if (isEditMode && initialData) {
            actualizarDireccion.mutate({id:initialData.id, direccion:data},{onSuccess:()=>
                    {onClose();
                    onSuccess?.();
                    }
            })
        } else {
            crearDireccion.mutate(data, {onSuccess: () => {
                onClose();
                onSuccess?.();
            }})
        }}
    if (!isOpen) return null;
    return (
                    <Modal isOpen={isOpen} onClose={onClose} title={isEditMode ? "Editar dirección" : "Nueva dirección"}>
                    <DireccionesForm
                        initialData={initialData}
                        onSubmit={handleSubmit}
                        isLoading={actualizarDireccion.isPending || crearDireccion.isPending}
                        onCancel={onClose}
                    />
                    </Modal>

            )


        }
