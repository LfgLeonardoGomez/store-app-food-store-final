import { useQuery } from "@tanstack/react-query";
import { direccionesService } from "../service/direccionesService";

export const useDirecciones = () => {
    return useQuery({
    queryKey: ['direcciones'],
    queryFn: () => direccionesService.listarDirecciones(),
    });
};