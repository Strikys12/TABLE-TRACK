import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { reservationService } from '../services/reservationService';

import fondoRestaurante from '../assets/panel-bg.png';

export default function Panel() {
    const navigate = useNavigate();

    // 1. Cargar datos del Anfitrión desde LocalStorage (Punto 4.1 del PDF)
    const sessionData = localStorage.getItem('hostSession');
    const host = sessionData ? JSON.parse(sessionData) : { fullName: 'Anfitrión', shift: 'No asignado' };

    // Estados de la aplicación (Inician vacíos esperando la respuesta de la API)
    const [reservations, setReservations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // Estado unificado para el formulario (Maneja creación y edición)
    const [formData, setFormData] = useState({ nombreCliente: '', cantidadPersonas: '', fechaHora: '', estado: 'En Espera' });
    const [editingId, setEditingId] = useState(null);

    // --- GET (Lectura): Consumo del servicio al montar el componente ---
    const fetchReservations = async () => {
        try {
            const data = await reservationService.getAll();
            setReservations(data);
        } catch (error) {
            console.error("Error al cargar las reservas:", error.message);
            Swal.fire('Error', 'No se pudieron recuperar las reservas del servidor.', 'error');
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    // Lógica para Cerrar Sesión (Requerimiento 4.1 del PDF)
    const handleLogout = () => {
        localStorage.removeItem('hostSession');
        navigate('/login');
    };

    // --- POST & PUT: Crear nuevas reservas o actualizar existentes ---
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validaciones estrictas del punto 4.2 del PDF
        if (!formData.nombreCliente.trim() || !formData.cantidadPersonas) {
            Swal.fire('Campos Vacíos', 'El nombre del cliente y la cantidad de personas son requeridos.', 'error');
            return;
        }

        try {
            if (editingId) {
                // Actualizar a través del servicio (PUT)
                await reservationService.update(editingId, formData);
                Swal.fire('¡Modificado!', 'La reserva ha sido actualizada con éxito.', 'success');
            } else {
                // Crear a través del servicio (POST)
                await reservationService.create(formData);
                Swal.fire('¡Registrado!', 'La nueva reserva fue añadida al sistema.', 'success');
            }

            // Resetear estados y refrescar tabla
            setFormData({ nombreCliente: '', cantidadPersonas: '', fechaHora: '', estado: 'En Espera' });
            setEditingId(null);
            fetchReservations();
        } catch (error) {
            console.error("Error en la operación:", error.message);
            Swal.fire('Error', 'No se pudo procesar la solicitud.', 'error');
        }
    };

    // Cargar datos en el formulario para activar modo edición
    const handleEditClick = (res) => {
        setEditingId(res.id);
        setFormData({
            nombreCliente: res.nombreCliente,
            cantidadPersonas: res.cantidadPersonas,
            fechaHora: res.fechaHora,
            estado: res.estado
        });
    };

    // --- PUT/PATCH Rápido: Cambiar estado directamente a "Finalizada" (Punto 4.2) ---
    const handleCompleteStatus = async (res) => {
        try {
            const updatedData = { ...res, estado: 'Finalizada' };
            await reservationService.update(res.id, updatedData);
            Swal.fire('Mesa Liberada', 'La reserva ha sido marcada como Finalizada.', 'success');
            fetchReservations();
        } catch (error) {
            console.error("Error al cambiar estado:", error.message);
            Swal.fire('Error', 'No se pudo actualizar el estado.', 'error');
        }
    };

    // --- DELETE: Cancelación Obligatoria con advertencia SweetAlert2 (Punto 4.2) ---
    const handleDelete = (id) => {
        Swal.fire({
            title: '¿Estás seguro de cancelar esta reserva?',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#374151',
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'Volver'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await reservationService.delete(id);
                    Swal.fire('¡Cancelada!', 'La reserva ha sido eliminada del sistema.', 'success');
                    fetchReservations();
                } catch (error) {
                    console.error("Error al eliminar:", error.message);
                    Swal.fire('Error', 'No se pudo eliminar la reserva.', 'error');
                }
            }
        });
    };

    // 2. Lógica de filtrado usando los nombres de campos en ESPAÑOL (nombreCliente)
    const filteredReservations = reservations.filter((res) =>
        res.nombreCliente?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 3. Renderizar el Badge con los estados obligatorios en ESPAÑOL
    const getStatusBadge = (estado) => {
        const styles = {
            Confirmada: 'bg-green-500/20 text-green-400 border border-green-500/30',
            'En Espera': 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30',
            Finalizada: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
        };
        return (
            <span className={`px-2 py-1 text-xs font-semibold rounded-md ${styles[estado] || 'bg-gray-500/20 text-gray-400'}`}>
                {estado || 'En Espera'}
            </span>
        );
    };

    return (
        // 2. CONTENEDOR PRINCIPAL CON LA IMAGEN IMPORTADA
        <div
            className="p-10 min-h-screen text-white font-sans relative overflow-hidden bg-gray-950"
            style={{
                // Usamos la variable importada fondoRestaurante
                backgroundImage: `url(${fondoRestaurante})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* 3. CAPA DE DESENFOQUE (BLUR) Y OPACIDAD SOBRE EL FONDO */}
            <div
                className="absolute inset-0 z-0 bg-inherit"
                style={{
                    filter: 'blur(8px)', // Desenfoque suave alusivo
                    transform: 'scale(1.1)', // Evita bordes blancos
                    opacity: 0.5, // Oscurece el fondo para que resalte la UI
                }}
            />

            {/* 4. CONTENIDO PRINCIPAL (z-10 sobre el desenfoque) */}
            <div className="relative z-10">

                {/* Encabezado */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-orange-950/30 pb-6 mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                            <span className="text-orange-500">T</span>able <span className="text-orange-500">T</span>rack
                        </h1>
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

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* FORMULARIO DE ACCIONES (POST / PUT) */}
                    {/* Backdrop Blur para efecto de cristal bacano */}
                    <div className="bg-black/50 p-6 rounded-xl border border-orange-950/30 shadow-xl h-fit backdrop-blur-md">
                        <h2 className="text-xl font-semibold text-orange-400 mb-4">
                            {editingId ? '📝 Editar Reserva' : '➕ Nueva Reserva'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Nombre del Cliente</label>
                                <input
                                    type="text"
                                    value={formData.nombreCliente}
                                    onChange={(e) => setFormData({ ...formData, nombreCliente: e.target.value })}
                                    className="w-full rounded-md bg-black/50 border border-orange-950/50 p-2 text-sm text-white focus:border-orange-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Cantidad de Personas</label>
                                <input
                                    type="number"
                                    value={formData.amount || formData.cantidadPersonas}
                                    onChange={(e) => setFormData({ ...formData, cantidadPersonas: parseInt(e.target.value) || '' })}
                                    className="w-full rounded-md bg-black/50 border border-orange-950/50 p-2 text-sm text-white focus:border-orange-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Fecha y Hora</label>
                                <input
                                    type="datetime-local"
                                    value={formData.fechaHora}
                                    onChange={(e) => setFormData({ ...formData, fechaHora: e.target.value })}
                                    className="w-full rounded-md bg-black/50 border border-orange-950/50 p-2 text-sm text-white focus:border-orange-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-xs text-gray-400 mb-1">Estado de la Reserva</label>
                                <select
                                    value={formData.estado}
                                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                                    className="w-full rounded-md bg-black/50 border border-orange-950/50 p-2 text-sm text-white focus:border-orange-500 outline-none"
                                >
                                    <option value="Confirmada">Confirmada</option>
                                    <option value="En Espera">En Espera</option>
                                    <option value="Finalizada">Finalizada</option>
                                </select>
                            </div>
                            <div className="flex gap-2 pt-2">
                                <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 p-2 rounded-md text-sm font-medium transition-all">
                                    {editingId ? 'Guardar Cambios' : 'Registrar'}
                                </button>
                                {editingId && (
                                    <button
                                        type="button"
                                        onClick={() => { setEditingId(null); setFormData({ nombreCliente: '', cantidadPersonas: '', fechaHora: '', estado: 'En Espera' }); }}
                                        className="bg-gray-800 hover:bg-gray-700 p-2 rounded-md text-sm transition-all"
                                    >
                                        Cancelar
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* TABLA PRINCIPAL Y BUSCADOR */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Barra de herramientas / Buscador */}
                        <div>
                            <input
                                type="text"
                                placeholder="Buscar cliente por nombre..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full max-w-md rounded-lg bg-black/50 px-4 py-2 text-white border border-orange-950/50 focus:border-orange-500 outline-none text-sm transition-all backdrop-blur-sm"
                            />
                        </div>

                        {/* Tabla con Propiedades Corregidas */}
                        {/* Backdrop Blur para la tabla también */}
                        <div className="bg-black/40 rounded-xl border border-orange-950/30 overflow-hidden shadow-xl backdrop-blur-md">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-orange-950/20 text-gray-300 text-sm font-semibold border-b border-orange-950/30 hover:bg-inherit">
                                    <tr className="hover:bg-inherit">
                                        <th className="p-4">Cliente</th>
                                        <th className="p-4">Personas / Mesa</th>
                                        <th className="p-4">Fecha y Hora</th>
                                        <th className="p-4">Estado</th>
                                        <th className="p-4 text-center">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-orange-950/10 text-sm hover:bg-inherit">
                                    {filteredReservations.length > 0 ? (
                                        filteredReservations.map((res) => (
                                            <tr key={res.id} className="hover:bg-white/[0.02] transition-colors">
                                                <td className="p-4 font-medium text-white">{res.nombreCliente}</td>
                                                <td className="p-4 text-gray-300">{res.cantidadPersonas || res.mesa}</td>
                                                <td className="p-4 text-gray-400">{res.fechaHora}</td>
                                                <td className="p-4">{getStatusBadge(res.estado)}</td>
                                                <td className="p-4">
                                                    <div className="flex gap-2 justify-center">
                                                        {res.estado !== 'Finalizada' && (
                                                            <button
                                                                onClick={() => handleCompleteStatus(res)}
                                                                className="text-xs bg-green-950/40 hover:bg-green-900 border border-green-800/50 text-green-400 px-2 py-1 rounded transition-all"
                                                                title="Cambiar estado a Finalizada rápidamente"
                                                            >
                                                                ✓ Listo
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => handleEditClick(res)}
                                                            className="text-xs bg-blue-950/40 hover:bg-blue-900 border border-blue-800/50 text-blue-400 px-2 py-1 rounded transition-all"
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(res.id)}
                                                            className="text-xs bg-red-950/40 hover:bg-red-900 border border-red-800/50 text-red-400 px-2 py-1 rounded transition-all"
                                                        >
                                                            Cancelar
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="5" className="p-8 text-center text-gray-600">
                                                No se encontraron reservas registradas en el sistema.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}