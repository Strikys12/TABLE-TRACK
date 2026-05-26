import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para la redirección requerida
import Swal from 'sweetalert2'; // Para las alertas de validación e ingreso
import restaurantBg from '../assets/restaurante-bg.png'; // Asegúrate de tener esta imagen en tu carpeta de assets

export default function Login() {
    const [fullName, setFullName] = useState('');
    const [shift, setShift] = useState('Mañana'); // Turno por defecto
    const navigate = useNavigate();

    // Clases estéticas de Tailwind (Manteniendo tu diseño premium)
    const inputClasses = "mt-1 w-full rounded-lg bg-black/30 px-4 py-2 text-white outline outline-1 outline-orange-950 focus:outline-2 focus:outline-orange-500 shadow-inner transition-all placeholder:text-gray-600 sm:text-sm";
    const labelClasses = "text-sm font-medium text-gray-400";
    const shiftButtonBase = "flex flex-col items-center justify-center p-4 rounded-xl border border-orange-950/30 transition-all cursor-pointer group shadow-lg";

    // Iluminación dinámica de los botones de turnos
    const morningClasses = shift === 'Mañana' ? 'bg-orange-500/10 border-orange-500/50 shadow-[0_0_15px_rgba(251,146,60,0.2)]' : 'bg-black/20 hover:bg-black/30';
    const afternoonClasses = shift === 'Tarde' ? 'bg-yellow-500/10 border-yellow-500/50 shadow-[0_0_15px_rgba(250,204,21,0.2)]' : 'bg-black/20 hover:bg-black/30';
    const nightClasses = shift === 'Noche' ? 'bg-indigo-500/10 border-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.2)]' : 'bg-black/20 hover:bg-black/30';

    // ==========================================
    // LÓGICA DEL REQUERIMIENTO 4.1 (PDF)
    // ==========================================
    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Validar que el campo no esté vacío o lleno de puros espacios
        if (!fullName.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Campo incompleto',
                text: 'Por favor, ingresa tu nombre completo para iniciar el turno.',
                background: '#111827',
                color: '#fff',
                confirmButtonColor: '#ea580c'
            });
            return;
        }

        // 2. Guardar el objeto en LocalStorage exactamente como lo pide el PDF
        localStorage.setItem(
            'hostSession',
            JSON.stringify({
                fullName: fullName.trim(),
                shift: shift
            })
        );

        // 3. Alerta de éxito con SweetAlert2
        Swal.fire({
            icon: 'success',
            title: '¡Turno Iniciado!',
            text: `Bienvenido, anfitrión ${fullName}`,
            timer: 1500,
            showConfirmButton: false,
            background: '#111827',
            color: '#fff'
        });

        // 4. Redirigir de inmediato al panel de control de reservas
        navigate('/panel');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-950 px-6 py-12 relative overflow-hidden">

            {/* Fondo del restaurante */}
            <div className="absolute inset-0 bg-gray-950">
                <div className="absolute -inset-10 bg-orange-900 blur-3xl opacity-30"></div>
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40"
                    style={{ backgroundImage: `url(${restaurantBg})` }}
                ></div>
            </div>

            {/* Tarjeta contenedora Glassmorphism */}
            <div className="w-full max-w-md space-y-8 bg-black/40 p-8 rounded-2xl border border-orange-950 backdrop-blur-sm relative z-10 shadow-2xl">

                {/* Encabezado */}
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white flex items-center justify-center gap-3">
                        <span className="text-orange-500">T</span>able <span className="text-orange-500">T</span>rack
                        <span className="w-4 h-4 rounded-full bg-orange-500 shadow-[0_0_12px_rgba(251,146,60,0.8)]"></span>
                    </h1>
                    <h2 className="mt-4 text-2xl font-bold text-white">¡Bienvenido, Anfitrión!</h2>
                    <p className="mt-2 text-sm text-gray-500">Regístrate para comenzar tu turno.</p>
                </div>

                {/* Formulario conectado a la función de ingreso */}
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-5">

                        {/* Campo Nombre Completo */}
                        <div>
                            <label htmlFor="fullName" className={labelClasses}>Nombre Completo</label>
                            <input
                                type="text"
                                id="fullName"
                                required
                                value={fullName}
                                className={inputClasses}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Ej: Juan Pérez"
                            />
                        </div>

                        {/* Selección de Turno Visual */}
                        <div>
                            <label className={labelClasses}>Tu Turno Asignado</label>
                            <div className="mt-2 grid grid-cols-3 gap-4">

                                {/* Mañana */}
                                <div className={`${shiftButtonBase} ${morningClasses}`} onClick={() => setShift('Mañana')}>
                                    <svg className="w-8 h-8 text-orange-500 group-hover:text-orange-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.364 6.364l-.707-.707M6.364 17.636l-.707.707M17.636 6.364l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    <span className="mt-2 text-xs font-semibold text-white">Mañana</span>
                                </div>

                                {/* Tarde */}
                                <div className={`${shiftButtonBase} ${afternoonClasses}`} onClick={() => setShift('Tarde')}>
                                    <svg className="w-8 h-8 text-yellow-500 group-hover:text-yellow-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.364 6.364l-.707-.707M6.364 17.636l-.707.707M17.636 6.364l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                    <span className="mt-2 text-xs font-semibold text-white">Tarde</span>
                                </div>

                                {/* Noche */}
                                <div className={`${shiftButtonBase} ${nightClasses}`} onClick={() => setShift('Noche')}>
                                    <svg className="w-8 h-8 text-indigo-500 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                    <span className="mt-2 text-xs font-semibold text-white">Noche</span>
                                </div>

                            </div>
                        </div>

                    </div>

                    {/* Botón Ingresar */}
                    <div>
                        <button
                            type="submit"
                            className="w-full rounded-lg bg-orange-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(251,146,60,0.3)] hover:bg-orange-500 hover:shadow-[0_0_25px_rgba(251,146,60,0.5)] transition-all flex items-center justify-center gap-2"
                        >
                            Ingresar al Panel
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>

                    <p className="text-center text-xs text-gray-500">Tu sesión persistirá localmente.</p>

                </form>
            </div>

            {/* Footer */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-800">
                Table Track v1.0 | © 2024
            </div>

        </div>
    );
}