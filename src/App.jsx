import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Panel from './pages/Panel';
import Header from './components/Header';
import Footer from './components/Footer';

const ProtectedRoute = ({ children }) => {
  const hostSession = localStorage.getItem('hostSession');
  return hostSession ? children : <Navigate to="/login" replace />;
};

function App() {
  // Obtenemos la sesión para pasársela al Header
  const session = JSON.parse(localStorage.getItem('hostSession'));

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen bg-gray-950">
        {/* El Header siempre está presente */}
        <Header hostName={session?.nombre} />

        <main className="flex-grow">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/panel"
              element={
                <ProtectedRoute>
                  <Panel />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>

        {/* El Footer siempre está presente */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;