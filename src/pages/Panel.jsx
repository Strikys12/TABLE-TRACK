import { useNavigate } from 'react-router-dom';
import { reservations } from '../data/reservations';

export default function Panel() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('hostSession');
        navigate('/login');
    };

    return (
        <div className="p-10 bg-gray-900 min-h-screen text-white">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Panel de Administración</h1>
                <button onClick={handleLogout} className="bg-red-600 px-4 py-2 rounded hover:bg-red-700">
                    Cerrar Sesión
                </button>
            </div>

            <div className="bg-white/5 rounded-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-white/10">
                        <tr>
                            <th className="p-4">Cliente</th>
                            <th className="p-4">Mesa</th>
                            <th className="p-4">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservations.map((res) => (
                            <tr key={res.id} className="border-b border-white/5 hover:bg-white/5">
                                <td className="p-4">{res.customer}</td>
                                <td className="p-4">{res.table}</td>
                                <td className="p-4">{res.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}