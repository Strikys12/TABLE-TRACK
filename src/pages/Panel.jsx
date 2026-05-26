import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { reservationService } from '../services/reservationService';
import fondoRestaurante from '../assets/panel-bg.png';
import ReservationTable from '../components/ReservationTable';

export default function Panel() {
    const navigate = useNavigate();
    // Recuperamos el nombre del anfitrión de la sesión
    const sessionData = JSON.parse(localStorage.getItem('hostSession'));
    const hostName = sessionData?.nombre || 'Anfitrión';

    const [reservations, setReservations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        nombreCliente: '',
        cantidadPersonas: '',
        fechaHora: '',
        estado: 'En Espera',
        mesa: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [filterStatus, setFilterStatus] = useState('Todos');

    const getMinDate = () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        return now.toISOString().slice(0, 16);
    };

    const fetchReservations = async () => {
        try {
            const data = await reservationService.getAll();
            setReservations(data);
        } catch (error) {
            Swal.fire('Error', 'No se pudieron recuperar las reservas.', 'error');
        }
    };

    useEffect(() => {
        if (!localStorage.getItem('hostSession')) navigate('/login');
        fetchReservations();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('hostSession');
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.nombreCliente.trim() || !formData.cantidadPersonas || !formData.fechaHora || !formData.mesa) {
            Swal.fire('Campos Vacíos', 'Todos los campos son obligatorios.', 'error');
            return;
        }

        const mesaNum = parseInt(formData.mesa);
        if (isNaN(mesaNum) || mesaNum < 1 || mesaNum > 34) {
            Swal.fire('Mesa Inválida', 'El restaurante solo cuenta con mesas del 1 al 34.', 'error');
            return;
        }

        const personasNum = parseInt(formData.cantidadPersonas);
        if (isNaN(personasNum) || personasNum < 1 || personasNum > 25) {
            Swal.fire('Capacidad Excedida', 'El máximo permitido por reserva es de 25 personas.', 'error');
            return;
        }

        const mesaOcupada = reservations.some(
            (res) => res.fechaHora === formData.fechaHora && parseInt(res.mesa) === mesaNum && res.id !== editingId
        );

        if (mesaOcupada) {
            Swal.fire('Mesa Ocupada', `La mesa ${mesaNum} ya está reservada para ese horario.`, 'error');
            return;
        }

        setIsLoading(true);
        try {
            if (editingId) {
                await reservationService.update(editingId, formData);
                Swal.fire('¡Modificado!', 'Actualizado con éxito.', 'success');
            } else {
                await reservationService.create(formData);
                Swal.fire('¡Registrado!', 'Nueva reserva añadida.', 'success');
            }
            setFormData({ nombreCliente: '', cantidadPersonas: '', fechaHora: '', estado: 'En Espera', mesa: '' });
            setEditingId(null);
            await fetchReservations();
        } catch (error) {
            Swal.fire('Error', 'No se pudo procesar la solicitud.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditClick = (res) => {
        setEditingId(res.id);
        setFormData({ ...res });
    };

    const handleCompleteStatus = async (res) => {
        try {
            await reservationService.update(res.id, { ...res, estado: 'Finalizada' });
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
            confirmButtonText: 'Sí, eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await reservationService.delete(id);
                fetchReservations();
            }
        });
    };

    return (
        <div className="p-10 min-h-screen text-white relative bg-gray-950" style={{ backgroundImage: `url(${fondoRestaurante})`, backgroundSize: 'cover' }}>
            <div className="absolute inset-0 z-0 bg-gray-950/80" />
            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="flex justify-between items-center border-b border-orange-950/30 pb-6 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Table <span className="text-orange-500">Track</span></h1>
                        <p className="text-gray-400">Bienvenido, <span className="text-orange-400">{hostName}</span></p>
                    </div>
                    <button onClick={handleLogout} className="bg-gray-900 border border-red-950 text-red-400 px-4 py-2 rounded-lg text-sm hover:bg-red-950/20">Cerrar Sesión</button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Formulario */}
                    <div className="bg-black/50 p-6 rounded-xl border border-orange-950/30 backdrop-blur-md h-fit">
                        <h2 className="text-xl text-orange-400 mb-4">{editingId ? '📝 Editar Reserva' : '➕ Nueva Reserva'}</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input type="text" value={formData.nombreCliente} onChange={(e) => setFormData({ ...formData, nombreCliente: e.target.value })} className="w-full bg-black/50 border border-orange-950 p-2 rounded" placeholder="Nombre Cliente" />
                            <input type="number" value={formData.cantidadPersonas} onChange={(e) => setFormData({ ...formData, cantidadPersonas: e.target.value })} className="w-full bg-black/50 border border-orange-950 p-2 rounded" placeholder="Personas (Máx 25)" />
                            <input type="datetime-local" min={getMinDate()} value={formData.fechaHora} onChange={(e) => setFormData({ ...formData, fechaHora: e.target.value })} className="w-full bg-black/50 border border-orange-950 p-2 rounded" />
                            <input type="number" value={formData.mesa} onChange={(e) => setFormData({ ...formData, mesa: e.target.value })} className="w-full bg-black/50 border border-orange-950 p-2 rounded" placeholder="Mesa (1-34)" />

                            <select value={formData.estado} onChange={(e) => setFormData({ ...formData, estado: e.target.value })} className="w-full bg-black/50 border border-orange-950 p-2 rounded text-white">
                                <option value="En Espera">En Espera</option>
                                <option value="Confirmada">Confirmada</option>
                                <option value="Finalizada">Finalizada</option>
                            </select>

                            <button type="submit" className="w-full p-2 bg-orange-600 rounded hover:bg-orange-500 transition-colors">
                                {editingId ? 'Guardar Cambios' : 'Registrar'}
                            </button>
                            {editingId && <button type="button" onClick={() => setEditingId(null)} className="w-full p-2 bg-gray-700 rounded text-gray-300">Cancelar</button>}
                        </form>
                    </div>

                    {/* Tabla */}
                    <div className="lg:col-span-2">
                        <input type="text" placeholder="Buscar por cliente..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-black/50 mb-4 px-4 py-2 rounded-lg border border-orange-950" />
                        <ReservationTable
                            reservations={reservations.filter(r => (filterStatus === 'Todos' || r.estado === filterStatus) && r.nombreCliente.toLowerCase().includes(searchTerm.toLowerCase()))}
                            onEdit={handleEditClick}
                            onDelete={handleDelete}
                            onComplete={handleCompleteStatus}
                            statusBadgeRenderer={(estado) => (
                                <span className={`px-2 py-1 text-xs font-semibold rounded ${estado === 'Confirmada' ? 'bg-green-500/20 text-green-400' : estado === 'Finalizada' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                    {estado}
                                </span>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}