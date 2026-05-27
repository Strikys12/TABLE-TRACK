export default function ReservationTable({ reservations, onEdit, onDelete, onComplete, statusBadgeRenderer }) {
    return (
        <div className="bg-black/40 rounded-xl border border-orange-950/30 overflow-hidden shadow-xl backdrop-blur-md">
            <table className="w-full text-left">
                <thead className="bg-orange-950/20 text-gray-300 text-sm border-b border-orange-950/30">
                    <tr>
                        <th className="p-4">Cliente</th>
                        <th className="p-4">Personas</th>
                        <th className="p-4">Mesa</th> {/* Columna nueva */}
                        <th className="p-4">Fecha</th>
                        <th className="p-4">Estado</th>
                        <th className="p-4 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-orange-950/10 text-sm">
                    {reservations.map((res) => (
                        <tr key={res.id} className="hover:bg-white/[0.02]">
                            <td className="p-4">{res.nombreCliente}</td>
                            <td className="p-4">{res.cantidadPersonas}</td>

                            {/* Celda de Mesa con estilo destacado */}
                            <td className="p-4">
                                <span className="bg-orange-900/30 text-orange-400 font-bold px-2 py-1 rounded-md text-xs border border-orange-800/50">
                                    #{res.mesa}
                                </span>
                            </td>

                            <td className="p-4">{new Date(res.fechaHora).toLocaleString()}</td>
                            <td className="p-4">{statusBadgeRenderer(res.estado)}</td>
                            <td className="p-4 flex gap-2 justify-center">
                                {res.estado !== 'Finalizada' && (
                                    <button
                                        onClick={() => onComplete(res)}
                                        className="text-xs bg-green-950/40 text-green-400 px-2 py-1 rounded hover:bg-green-900"
                                        title="Finalizar Reserva"
                                    >
                                        ✓
                                    </button>
                                )}
                                <button
                                    onClick={() => onEdit(res)}
                                    className="text-xs bg-blue-950/40 text-blue-400 px-2 py-1 rounded hover:bg-blue-900"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(res.id)}
                                    className="text-xs bg-red-950/40 text-red-400 px-2 py-1 rounded hover:bg-red-900"
                                >
                                    X
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}