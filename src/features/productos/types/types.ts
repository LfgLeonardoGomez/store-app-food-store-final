    export interface CategoriaSimple {
    id: number;
    nombre: string;
    }
    export interface IngredienteSimple {
    id: number;
    nombre: string;
    }
    export interface ProductoResponse {
    id: number;
    nombre: string;
    descripcion: string | null;
    precio_base: string;
    imagen_url: string | null;
    stock_cantidad: number;
    disponible: boolean;
    categorias: CategoriaSimple[];
    ingredientes: IngredienteSimple[];
    }
    export interface ProductoList {
    data: ProductoResponse[];
    count: number;
    }
    export interface CategoriaResponse {
    id: number;
    nombre: string;
    descripcion: string | null;
    productos: unknown[];
    }