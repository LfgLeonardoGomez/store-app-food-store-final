import { Routes, Route, Navigate } from 'react-router-dom'
import Store from '../features/productos/pages/Store'
import CartPage from '../features/carrito/pages/CartPage'
import { ROUTES } from './routes'

import Login from '../features/auth/pages/login'
import MainLayout from '../shared/components/layout/MainLayout'
import ProductDetailPage from '../features/productos/pages/ProductDetailPage'
import CheckoutPage from '../features/carrito/pages/CheckoutPage'
import RegisterPage from '../features/auth/pages/register'
import MisPedidosPage from '../features/pedidos/pages/MisPedidosPage'
import MisDireccionesPage from '../features/direcciones/pages/misDireccionesPage'
import OrderResultPage from '../features/pagos/pages/OrderResultPage'
import { ClientRoute } from './PrivatesRoute'

export default function AppRouter() {
    return (
        <Routes>
            {/* Rutas con navbar */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<Navigate to={ROUTES.PRODUCTS} replace />} />
                <Route path={ROUTES.PRODUCTS} element={<Store />} />
                <Route path={ROUTES.CART} element={<CartPage />} />
                <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage/>} />
                <Route path={ROUTES.CHECKOUT} element={
                    <ClientRoute>
                        <CheckoutPage/>
                    </ClientRoute>
                } />
                <Route path={ROUTES.MIS_PEDIDOS} element={
                    <ClientRoute>
                        <MisPedidosPage/>
                    </ClientRoute>
                } />
                <Route path={ROUTES.MIS_DIRECCIONES} element={
                    <ClientRoute>
                        <MisDireccionesPage/>
                    </ClientRoute>
                } />

            </Route>

            {/* Rutas sin navbar */}
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage/>}/>
            <Route path={ROUTES.ORDER_RESULT} element={<OrderResultPage />} />
        </Routes>
    )
}