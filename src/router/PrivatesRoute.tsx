import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export function ClientRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (!user?.roles.includes('CLIENT')) return <Navigate to="/products" replace />

  return children
}
