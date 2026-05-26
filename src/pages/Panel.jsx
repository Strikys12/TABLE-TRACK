import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { reservations as initialReservations } from '../data/reservations';

export default function Panel() {
    const navigate = useNavigate();

    // 1. Cargar datos del Anfitrión desde LocalStorage (Exigido en el punto 4.1 del PDF)
    const sessionData = localStorage.getItem('hostSession');
    const host = sessionData ? JSON.parse(sessionData) : { fullName: 'Anfitrión', shift: 'No asignado' };

    // Pasamos la data inicial al estado de React
    const [reservations, setReservations] = useState(initialReservations);
    const [searchTerm, setSearchTerm] = useState('');

    // Lógica para Cerrar Sesión (Requerimiento 4.1 del PDF)
    const handleLogout = () => {
        localStorage.removeItem('hostSession');
        navigate('/login');
    };

    // 2. Lógica de filtrado usando los nombres de campos en ESPAÑOL (nombreCliente)
    const filteredReservations = reservations.filter((res) =>
        res.nombreCliente?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 3. Renderizar el Badge con los estados obligatorios en ESPAÑOL
    const getStatusBadge = (estado) => {
        const styles = {
            Confirmada: 'bg-green-500/20 text-green-400 border border-green-500/30',
            Pendiente: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
            Cancelada: 'bg-red-500/20 text-red-400 border border-red-500/30',
        };
        return (
            <span className={`px-2 py-1 text-xs font-semibold rounded-md ${styles[estado] || 'bg-gray-500/20 text-gray-400'}`}>
                {estado || 'Pendiente'}
            </span>
        );
    };

    return (
        <div className="p-10 bg-gray-950 min-h-screen text-white">

            {/* Encabezado con datos del Anfitrión requeridos en el PDF */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-orange-950/30 pb-6 mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <span className="text-orange-500">T</span>able <span className="text-orange-500">T</span>rack
                    </h1>
                    {/* VISUALIZACIÓN EXIGIDA POR EL PDF */}
                    <p className="text-gray-400 text-sm mt-1">
                        Anfitrión: <span className="text-orange-400 font-medium">{host.fullName}</span> | Turno: <span className="text-yellow-500 font-medium">{host.shift}</span>
                    </p>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-gray-900 border border-red-950/40 hover:bg-red-950/20 text-red-400 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-md"
                >
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
                    className="w-full max-w-md rounded-lg bg-black/30 px-4 py-2 text-white outline outline-1 outline-orange-950 focus:outline-2 focus:outline-orange-500 sm:text-sm transition-all"
                />
            </div>

            {/* Tabla con Propiedades Corregidas */}
            <div className="bg-black/20 rounded-xl border border-orange-950/30 overflow-hidden shadow-xl backdrop-blur-sm">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-orange-950/20 text-gray-300 text-sm font-semibold border-b border-orange-950/30">
                        <tr>
                            <th className="p-4">Cliente</th>
                            <th className="p-4">Personas / Mesa</th>
                            <th className="p-4">Fecha y Hora</th>
                            <th className="p-4">Estado</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-orange-950/10 text-sm">
                        {filteredReservations.length > 0 ? (
                            filteredReservations.map((res) => (
                                <tr key={res.id} className="hover:bg-white/[0.01] transition-colors">
                                    {/* Mapeo estricto con nombres en español */}
                                    <td className="p-4 font-medium text-white">{res.nombreCliente}</td>
                                    <td className="p-4 text-gray-300">{res.cantidadPersonas || res.mesa}</td>
                                    <td className="p-4 text-gray-400">{res.fechaHora}</td>
                                    <td className="p-4">{getStatusBadge(res.estado)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="p-8 text-center text-gray-600">
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