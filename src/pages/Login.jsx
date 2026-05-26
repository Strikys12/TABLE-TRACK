import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    return (
        <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-white">
                    Table Track - Acceso
                </h2>
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
        </div>
    );
}