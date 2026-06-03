import { Routes, Route, Navigate } from 'react-router-dom'
import Store from '../features/productos/pages/Store'
import CartPage from '../features/productos/pages/CartPage'
import { ROUTES } from './routes'

import Login from '../features/auth/pages/login'
import MainLayout from '../shared/components/layout/MainLayout'
import ProductDetailPage from '../features/productos/pages/ProductDetailPage'
import CheckoutPage from '../features/pedidos/pages/CheckoutPage'
import RegisterPage from '../features/auth/pages/register'

export default function AppRouter() {
    return (
        <Routes>
            {/* Rutas con navbar */}
            <Route element={<MainLayout />}>
                <Route path="/" element={<Navigate to={ROUTES.PRODUCTS} replace />} />
                <Route path={ROUTES.PRODUCTS} element={<Store />} />
                <Route path={ROUTES.CART} element={<CartPage />} />
                <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage/>} />
                <Route path={ROUTES.CHECKOUT} element={<CheckoutPage/>} />
            </Route>

            {/* Rutas sin navbar */}
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.REGISTER} element={<RegisterPage/>}/>
        </Routes>
    )
}