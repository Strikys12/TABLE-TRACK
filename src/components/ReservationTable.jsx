export default function ReservationTable({ reservations, onEdit, onDelete, onComplete, statusBadgeRenderer }) {
    return (
        // Añadimos min-w-full para obligar a que la tabla al menos mida el ancho del contenedor
        <div className="w-full overflow-x-auto bg-black/40 rounded-xl border border-orange-950/30 shadow-xl backdrop-blur-md">
            {/* min-w-[500px] asegura que NUNCA se escondan columnas, si no caben, forzará el scroll */}
            <table className="w-full text-left border-collapse min-w-[500px]">
                <thead className="bg-orange-950/20 text-gray-300 text-xs uppercase border-b border-orange-950/30">
                    <tr>
                        <th className="p-3 w-1/4">Cliente</th>
                        <th className="p-3 w-1/6">Pers.</th>
                        <th className="p-3 w-1/6">Mesa</th>
                        <th className="p-3 w-1/4">Estado</th>
                        <th className="p-3 w-1/4 text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-orange-950/10 text-sm">
                    {reservations.map((res) => (
                        <tr key={res.id} className="hover:bg-white/[0.02]">
                            <td className="p-3 truncate">{res.nombreCliente}</td>
                            <td className="p-3">{res.cantidadPersonas}</td>
                            <td className="p-3">
                                <span className="bg-orange-900/30 text-orange-400 font-bold px-2 py-1 rounded-md text-xs border border-orange-800/50">
                                    #{res.mesa}
                                </span>
                            </td>
                            <td className="p-3">{statusBadgeRenderer(res.estado)}</td>
                            <td className="p-3 flex gap-1 justify-center">
                                {res.estado !== 'Finalizada' && (
                                    <button onClick={() => onComplete(res)} className="text-[10px] bg-green-950/40 text-green-400 px-2 py-1 rounded hover:bg-green-900">✓</button>
                                )}
                                <button onClick={() => onEdit(res)} className="text-[10px] bg-blue-950/40 text-blue-400 px-2 py-1 rounded hover:bg-blue-900">Edit</button>
                                <button onClick={() => onDelete(res.id)} className="text-[10px] bg-red-950/40 text-red-400 px-2 py-1 rounded hover:bg-red-900">X</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}