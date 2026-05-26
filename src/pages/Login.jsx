import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
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

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-100">Email address</label>
                        <div className="mt-2">
                            <input type="email" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:outline-indigo-500" />
                        </div>

                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-100">Password</label>
                        <div className="mt-2">
                            <input type="password" className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline outline-1 -outline-offset-1 outline-white/10 focus:outline-2 focus:outline-indigo-500" />
                        </div>
                    </div>
                    <button type="button" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400">
                        Sign in
                    </button>
                </form>
            </div>

            {/* Footer */}
            <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-800">
                Table Track v1.0 | © 2026 David Quiroz. Todos los derechos reservados.
            </div>

        </div>
    );
}