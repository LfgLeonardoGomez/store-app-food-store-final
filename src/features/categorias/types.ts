export interface CategoriaResponse {
  id: number;
  nombre: string;
  descripcion: string | null;
  productos: unknown[];
}

export interface CategoriaList {
  data: CategoriaResponse[];
  count: number;
}
