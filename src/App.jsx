import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Importa los componentes usando la ruta relativa "./" para indicar que están en la misma carpeta src
import Login from './pages/Login';
import Panel from './pages/Panel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/panel" element={<Panel />} />
        {/* ... resto de tu lógica ... */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;