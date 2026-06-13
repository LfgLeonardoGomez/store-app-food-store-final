

export interface DireccionEntrega {
    id: number;
    alias: string;
    linea_1: string;
    linea_2: string;
    ciudad: string;
    provincia: string;
    codigo_postal: string;
    es_principal: boolean;
}

export interface DireccionEntregaCreate{
    alias: string;
    linea_1: string;
    linea_2: string;
    ciudad: string;
    provincia: string;
    codigo_postal: string;
    es_principal: boolean;
}

export interface DireccionEntregaUpdate{
    alias?: string;
    linea_1?: string;
    linea_2?: string;
    ciudad?: string;
    provincia?: string;
    codigo_postal?: string;
    es_principal?: boolean;
}

export interface DireccionEntregaList {
    data: DireccionEntrega[];
    count: number;
}
