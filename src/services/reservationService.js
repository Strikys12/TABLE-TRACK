// ⚠️ URL de tu MockAPI
const API_URL = 'https://6a15ab5f91ff9a63de08967d.mockapi.io/reservations';

export const reservationService = {
    // GET: Obtener todas las reservas
    getAll: async () => {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al obtener las reservas');
        return await response.json();
    },

    // POST: Crear una nueva reserva (con saneamiento de datos)
    create: async (data) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...data,
                cantidadPersonas: parseInt(data.cantidadPersonas),
                mesa: parseInt(data.mesa)
            })
        });
        if (!response.ok) throw new Error('Error al crear la reserva');
        return await response.json();
    },

    // PUT: Actualizar una reserva existente (con saneamiento de datos)
    update: async (id, data) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...data,
                cantidadPersonas: parseInt(data.cantidadPersonas),
                mesa: parseInt(data.mesa)
            })
        });
        if (!response.ok) throw new Error('Error al actualizar la reserva');
        return await response.json();
    },

    // DELETE: Cancelar/Eliminar una reserva
    delete: async (id) => {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Error al eliminar la reserva');
        return true;
    }
};