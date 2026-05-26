// ⚠️ Reemplaza con tu URL real de MockAPI
const API_URL = 'https://6a15ab5f91ff9a63de08967d.mockapi.io/reservations';

export const reservationService = {
    // GET: Obtener todas las reservas
    getAll: async () => {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al obtener las reservas');
        return await response.json();
    },

    // POST: Crear una nueva reserva
    create: async (reservationData) => {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservationData)
        });
        if (!response.ok) throw new Error('Error al crear la reserva');
        return await response.json();
    },

    // PUT: Actualizar una reserva existente (o cambiar estado)
    update: async (id, reservationData) => {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reservationData)
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