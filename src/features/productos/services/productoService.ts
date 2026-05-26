import api from '../../../shared/axios'
import type { ProductoList, ProductoResponse } from '../types/types'

export const getProductos = async(offset:number=0, limit:number=20): Promise<ProductoList> => {
    const {data} = await api.get('/productos',{ params: { offset, limit } })
    return data
}

export const getProductoById = async(id:number): Promise<ProductoResponse> => {
    const {data} = await api.get(`/productos/${id}`)
    return data
}
