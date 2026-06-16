import api from "../../../shared/axios";
import type { DireccionEntrega, DireccionEntregaCreate, DireccionEntregaList, DireccionEntregaUpdate } from "../types/types";


export const direccionesService ={
    listarDirecciones: async (): Promise<DireccionEntregaList> => {
    const { data } = await api.get('/direcciones');
    return data;
    },

    crearDireccion: async (direccion: DireccionEntregaCreate): Promise<DireccionEntrega> => {
    const { data } = await api.post('/direcciones', direccion);
    return data;
    },

    actualizarDireccion: async (id: number, direccion: DireccionEntregaUpdate): Promise<DireccionEntrega> =>{
    const { data } = await api.put(`/direcciones/${id}`, direccion);
    return data;
    },

    eliminarDireccion: async (id: number): Promise<void> => {
    await api.delete(`/direcciones/${id}`);
    },

    obtenerDireccion: async (id:number): Promise<DireccionEntrega> => {
        const { data } = await api.get(`/direcciones/${id}`);
        return data;
    },

    setPrincipal: async (id:number): Promise<void> => {
        await api.put(`/direcciones/${id}/principal`);
    }
}
