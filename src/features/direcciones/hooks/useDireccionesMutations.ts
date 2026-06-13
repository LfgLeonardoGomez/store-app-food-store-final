import { useMutation, useQueryClient } from "@tanstack/react-query"
import { direccionesService } from "../service/direccionesService"
import type { DireccionEntregaCreate, DireccionEntregaUpdate } from "../types/types";


export const useDireccionesMutations = () => {
    const queryClient = useQueryClient()
    
    const crearDireccion = useMutation({
            mutationFn: (direccion: DireccionEntregaCreate) => direccionesService.crearDireccion(direccion),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['direcciones'] })
            }
        })

    const actualizarDireccion = useMutation({
            mutationFn: (params: { id: number; direccion: DireccionEntregaUpdate }) => direccionesService.actualizarDireccion(params.id, params.direccion),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['direcciones'] });
            }
        });
    

    const eliminarDireccion =  useMutation({
            mutationFn: (id: number) => direccionesService.eliminarDireccion(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['direcciones'] });
            }
        });
    

    const setPrincipal =  useMutation({
            mutationFn: (id: number) => direccionesService.setPrincipal(id),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['direcciones'] });
            }
        });
    

    return { crearDireccion, actualizarDireccion, eliminarDireccion, setPrincipal };
}