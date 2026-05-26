import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // 1. Validación de campos vacíos
        if (!email.trim() || !password.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Campos vacíos',
                text: 'Por favor, completa todos los datos para ingresar.',
            });
            return;
        }

        // 2. Simulamos la sesión (Objeto exigido)
        const mockSession = {
            email: email,
            role: 'admin',
            token: 'fake-jwt-token-12345'
        };

        localStorage.setItem('hostSession', JSON.stringify(mockSession));

        // 3. Alerta de éxito
        Swal.fire({
            icon: 'success',
            title: '¡Bienvenido!',
            text: 'Ingreso exitoso al sistema de reservas.',
            timer: 1500,
            showConfirmButton: false
        });

        // 4. Redirección al panel
        navigate('/panel');
    };

    return (
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
                    Table Track - Acceso
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-100">Email address</label>
                        <div className="mt-2">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:outline-indigo-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-100">Password</label>
                        <div className="mt-2">
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:outline-indigo-500"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400"
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}