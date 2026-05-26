import {useQuery} from '@tanstack/react-query'
import { getProductoById, getProductos } from '../services/productoService'

interface UseProductoOptions {
    id?:number
    offset?:number
    limit?:number
}

export const useProductos = (options?: UseProductoOptions) => {
    const { id, offset = 0, limit = 10 } = options || {}

    const listado = useQuery({
        queryKey: ['productos', id, offset, limit],
        queryFn: () => getProductos(offset, limit),
        enabled: id === undefined, // Solo se ejecuta si no hay ID
    })

    const detalle = useQuery({
        queryKey: ['producto', id],
        queryFn: () => getProductoById(id!),
        enabled: id !== undefined, // Solo se ejecuta si hay ID
    })



    return {
        // para la lista de productos
        productos: listado.data,
        isLoadingProductos: listado.isLoading,
        isErrorProductos: listado.isError,

        // para el detalle de producto
        producto: detalle.data,
        isLoadingDetalle: detalle.isLoading,
        isErrorDetalle: detalle.isError,
    }
}