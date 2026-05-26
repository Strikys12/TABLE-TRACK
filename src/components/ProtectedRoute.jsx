import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    // Revisamos si existe la sesión en el LocalStorage
    const session = localStorage.getItem('hostSession');

    // Si no hay sesión, forzamos la redirección al login como pide el PDF
    if (!session) {
        return <Navigate to="/login" replace />;
    }

    // Si la sesión existe, renderiza el componente hijo (el panel)
    return children;
}