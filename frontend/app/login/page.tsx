"use client";

import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui chamaremos a API do NestJS futuramente
        console.log({ email, password });
    };

    return (
        <div className="min-h-screen h-screen w-full flex items-center justify-center bg-[#f8fafc] p-4">
            <div className="w-full max-w-md">
                {/* Logo/Marca */}
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <div className="relative">
                            {/* Avatar aumentado para 80px (w-20 h-20) */}
                            <div className="flex items-center justify-center w-20 h-20 bg-blue-600 rounded-full text-white text-2xl font-black shadow-xl shadow-blue-500/20 border-4 border-white">
                                LG
                            </div>
                            {/* Ponto de status sem texto dentro para ser apenas um círculo */}
                            <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></div>
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-800">Bem-vindo de volta!</h1>
                    <p className="text-gray-400 text-sm">Acesse sua conta para gerenciar sua loja</p>
                </div>

                {/* Card de Login */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
                    <form onSubmit={handleLogin} className="space-y-5">

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">E-mail</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 text-gray-300" size={18} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="admin@loja.com"
                                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                    required
                                />
                            </div>
                        </div>

                        {/* Senha */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Senha</label>
                                <a href="#" className="text-[10px] font-bold text-blue-600 hover:underline">Esqueceu a senha?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 text-gray-300" size={18} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-10 pr-12 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-3 text-gray-300 hover:text-gray-500 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-center w-full mt-4">
                            <button
                                type="submit"
                                className="w-[300px] h-52px] bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                            >
                                <LogIn size={18} />
                                Entrar no Sistema
                            </button>
                        </div>

                    </form>

                    {/* Footer do Card */}
                    <div className="mt-8 pt-6 border-t border-gray-50 text-center">
                        <p className="text-gray-400 text-xs">
                            Não tem uma conta? <a href="#" className="text-blue-600 font-bold hover:underline">Solicite acesso</a>
                        </p>
                    </div>
                </div>

                {/* Rodapé da Página */}
                <p className="text-center text-gray-300 text-[10px] mt-8 uppercase tracking-widest font-medium">
                    © 2024 Loja Gestão v1.0
                </p>
            </div>
        </div>
    );
}
