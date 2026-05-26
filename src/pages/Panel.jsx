import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { reservationService } from '../services/reservationService';
import fondoRestaurante from '../assets/panel-bg.png';
import ReservationTable from '../components/ReservationTable'; // Importación añadida

export default function Panel() {
    const navigate = useNavigate();
    const sessionData = localStorage.getItem('hostSession');
    const host = sessionData ? JSON.parse(sessionData) : { fullName: 'Anfitrión', shift: 'No asignado' };

    const [reservations, setReservations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({ nombreCliente: '', cantidadPersonas: '', fechaHora: '', estado: 'En Espera' });
    const [editingId, setEditingId] = useState(null);

    const fetchReservations = async () => {
        try {
            const data = await reservationService.getAll();
            setReservations(data);
        } catch (error) {
            Swal.fire('Error', 'No se pudieron recuperar las reservas.', 'error');
        }
    };

    useEffect(() => { fetchReservations(); }, []);

    const handleLogout = () => {
        localStorage.removeItem('hostSession');
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nombreCliente.trim() || !formData.cantidadPersonas) {
            Swal.fire('Campos Vacíos', 'Nombre y cantidad son requeridos.', 'error');
            return;
        }
        try {
            if (editingId) {
                await reservationService.update(editingId, formData);
                Swal.fire('¡Modificado!', 'Actualizado con éxito.', 'success');
            } else {
                await reservationService.create(formData);
                Swal.fire('¡Registrado!', 'Nueva reserva añadida.', 'success');
            }
            setFormData({ nombreCliente: '', cantidadPersonas: '', fechaHora: '', estado: 'En Espera' });
            setEditingId(null);
            fetchReservations();
        } catch (error) {
            Swal.fire('Error', 'No se pudo procesar la solicitud.', 'error');
        }
    };

    const handleEditClick = (res) => {
        setEditingId(res.id);
        setFormData({ nombreCliente: res.nombreCliente, cantidadPersonas: res.cantidadPersonas, fechaHora: res.fechaHora, estado: res.estado });
    };

    const handleCompleteStatus = async (res) => {
        try {
            await reservationService.update(res.id, { ...res, estado: 'Finalizada' });
            Swal.fire('Mesa Liberada', 'Reserva Finalizada.', 'success');
            fetchReservations();
        } catch (error) {
            Swal.fire('Error', 'No se pudo actualizar.', 'error');
        }
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "No se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            confirmButtonText: 'Sí, cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await reservationService.delete(id);
                fetchReservations();
            }
        });
    };

    const filteredReservations = reservations.filter((res) =>
        res.nombreCliente?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusBadge = (estado) => {
        const styles = {
            Confirmada: 'bg-green-500/20 text-green-400 border border-green-500/30',
            'En Espera': 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
            Finalizada: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
        };
        return <span className={`px-2 py-1 text-xs font-semibold rounded-md ${styles[estado] || 'bg-gray-500/20'}`}>{estado}</span>;
    };

    return (
        <div className="p-10 min-h-screen text-white relative bg-gray-950" style={{ backgroundImage: `url(${fondoRestaurante})`, backgroundSize: 'cover' }}>
            <div className="absolute inset-0 z-0 bg-inherit filter blur-lg opacity-50" />
            <div className="relative z-10">
                <div className="flex justify-between border-b border-orange-950/30 pb-6 mb-8">
                    <h1 className="text-3xl font-bold">Table <span className="text-orange-500">Track</span></h1>
                    <button onClick={handleLogout} className="bg-gray-900 border border-red-950 text-red-400 px-4 py-2 rounded-lg text-sm">Cerrar Sesión</button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="bg-black/50 p-6 rounded-xl border border-orange-950/30 backdrop-blur-md h-fit">
                        <h2 className="text-xl text-orange-400 mb-4">{editingId ? '📝 Editar' : '➕ Nueva'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" value={formData.nombreCliente} onChange={(e) => setFormData({ ...formData, nombreCliente: e.target.value })} className="w-full bg-black/50 border border-orange-950 p-2 rounded" placeholder="Nombre" />
                            <input type="number" value={formData.cantidadPersonas} onChange={(e) => setFormData({ ...formData, cantidadPersonas: e.target.value })} className="w-full bg-black/50 border border-orange-950 p-2 rounded" placeholder="Personas" />
                            <input type="datetime-local" value={formData.fechaHora} onChange={(e) => setFormData({ ...formData, fechaHora: e.target.value })} className="w-full bg-black/50 border border-orange-950 p-2 rounded" />
                            <button type="submit" className="w-full bg-orange-600 p-2 rounded">{editingId ? 'Guardar' : 'Registrar'}</button>
                        </form>
                    </div>

                    <div className="lg:col-span-2 space-y-4">
                        <input type="text" placeholder="Buscar..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-black/50 px-4 py-2 rounded-lg border border-orange-950" />

                        {/* Aquí está el componente extraído */}
                        <ReservationTable
                            reservations={filteredReservations}
                            onEdit={handleEditClick}
                            onDelete={handleDelete}
                            onComplete={handleCompleteStatus}
                            statusBadgeRenderer={getStatusBadge}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}