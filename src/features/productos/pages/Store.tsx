import { useState } from 'react';
import { SearchBar } from '../../../shared/components/molecular/SearchBar';
import { ProductCard } from '../components/ProductCard';
import { useProductos } from '../hooks/useProductos';
import { useCategorias } from '../../categorias/hooks/useCategoria';



export default function Store() {


    const [searchQuery, setSearchQuery] = useState('');
    const {productos, isLoadingProductos, isErrorProductos} = useProductos()
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState<string>('')
    const { data: categoriasData } = useCategorias();
    const productosFiltrados = productos?.data.filter((p) => {
    const coincideNombre = p.nombre.toLowerCase().includes(searchQuery.toLowerCase());
    const coincideCategoria = categoriaSeleccionada === '' || 
        p.categorias.some((cat) => cat.nombre === categoriaSeleccionada);
    return coincideNombre && coincideCategoria;
    }) || []
        
    return (
        <div className="min-h-screen bg-surface">
        {/* Header de la página */}
        <div className="bg-background border-b border-border px-4 py-6">
            <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-text-primary mb-4">
                Nuestros Productos
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-3">
                <SearchBar 
                    value={searchQuery}
                    onChange={setSearchQuery}
                    className="max-w-md flex-1"
                />
                <select
                    value={categoriaSeleccionada}
                    onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                    className="border border-border rounded-lg px-4 py-2.5 bg-background text-text-primary focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all sm:w-64"
                >
                    <option value="">Todas las categorías</option>
                    {categoriasData?.data.map((cat) => (
                        <option key={cat.id} value={cat.nombre}>{cat.nombre}</option>
                    ))}
                </select>
            </div>
            </div>
        </div>
        {/* Contenido principal */}
        <div className="max-w-7xl mx-auto px-4 py-8">
            {searchQuery && (
            <p className="text-text-secondary mb-4">
                Buscando: "{searchQuery}"
            </p>
            )}
            
               {/* Estado de carga */}
                {isLoadingProductos && (
                    <div className="text-center py-20 text-text-secondary">Cargando productos...</div>
                )}
                {/* Estado de error */}
                {isErrorProductos && (
                    <div className="text-center py-20 text-danger">Error al cargar productos</div>
                )}
            
            {/* Grid: solo si NO está cargando ni hay error */}
                {!isLoadingProductos && !isErrorProductos && productosFiltrados.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {productosFiltrados.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                nombre={product.nombre}
                                descripcion={product.descripcion || ''}
                                precio={parseFloat(product.precio_base)}
                                imagen={product.imagen_url || undefined}
                                categoria={product.categorias[0]?.nombre}
                            />
                        ))}
                    </div>
                )}

                {!isLoadingProductos && !isErrorProductos && productosFiltrados.length === 0 && (
                    <div className="text-center py-20 text-text-secondary">
                        No se encontraron productos{searchQuery ? ` para "${searchQuery}"` : ''}
                        {categoriaSeleccionada ? ` en la categoría "${categoriaSeleccionada}"` : ''}
                    </div>
                )}
            </div>
        </div>
    );
}