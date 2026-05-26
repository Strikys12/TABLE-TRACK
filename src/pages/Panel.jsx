import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reservations as initialReservations } from '../data/reservations';

export default function Panel() {
    const navigate = useNavigate();
    // Pasamos la data inicial al estado de React
    const [reservations, setReservations] = useState(initialReservations);
    const [searchTerm, setSearchTerm] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('hostSession');
        navigate('/login');
    };

    // Lógica de filtrado en tiempo real
    const filteredReservations = reservations.filter((res) =>
        res.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Función para renderizar el Badge de estado con estilo pro
    const getStatusBadge = (status) => {
        const styles = {
            Confirmada: 'bg-green-500/20 text-green-400 border border-green-500/30',
            Pendiente: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
            Cancelada: 'bg-red-500/20 text-red-400 border border-red-500/30',
        };
        return (
            <span className={`px-2 py-1 text-xs font-semibold rounded-md ${styles[status] || 'bg-gray-500/20 text-gray-400'}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="p-10 bg-gray-900 min-h-screen text-white">
            {/* Encabezado */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Table Track</h1>
                    <p className="text-gray-400 text-sm mt-1">Gestión de reservas e ingresos</p>
                </div>
                <button onClick={handleLogout} className="bg-red-600/80 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Cerrar Sesión
                </button>
            </div>

            {/* Barra de herramientas / Buscador */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Buscar cliente por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full max-w-md rounded-md bg-white/5 px-4 py-2 text-white outline outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
                />
            </div>

            {/* Tabla Pro */}
            <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-white/10 text-gray-300 text-sm font-semibold">
                        <tr>
                            <th className="p-4">Cliente</th>
                            <th className="p-4">Mesa</th>
                            <th className="p-4">Fecha</th>
                            <th className="p-4">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                        {filteredReservations.length > 0 ? (
                            filteredReservations.map((res) => (
                                <tr key={res.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="p-4 font-medium text-white">{res.customer}</td>
                                    <td className="p-4 text-gray-300">{res.table}</td>
                                    <td className="p-4 text-gray-400">{res.date}</td>
                                    <td className="p-4">{getStatusBadge(res.status)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-gray-500">
                                    No se encontraron reservas que coincidan con la búsqueda.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}