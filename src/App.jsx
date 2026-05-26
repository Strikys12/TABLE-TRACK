import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importa los componentes usando la ruta relativa "./" para indicar que están en la misma carpeta src
import Login from './pages/Login';
import Panel from './pages/Panel';

import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Panel from './pages/Panel';

// Guardia de rutas: verifica si hay datos en LocalStorage
const ProtectedRoute = ({ children }) => {
  const hostSession = localStorage.getItem('hostSession');

  if (!hostSession) {
    // Si no hay sesión, lo devuelve forzosamente al login [cite: 51]
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/panel" element={<Panel />} />
        {/* ... resto de tu lógica ... */}

        {/* El panel está envuelto por el guardia de seguridad */}
        <Route
          path="/panel"
          element={
            <ProtectedRoute>
              <Panel />
            </ProtectedRoute>
          }
        />

        {/* Cualquier ruta inventada redirecciona al login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;