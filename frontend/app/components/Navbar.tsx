"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Menu, Calendar, ChevronDown, LogOut, UserPlus, Users, User } from 'lucide-react';

interface NavbarProps {
    toggleSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
    const [currentDate, setCurrentDate] = useState("");
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const date = new Date().toLocaleDateString('pt-BR', {
            day: '2-digit', month: '2-digit', year: 'numeric'
        });
        setCurrentDate(date);
    }, []);

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-40">
            <div className="flex items-center gap-4">
                <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500">
                    <Menu size={20} />
                </button>
                <span className="text-sm font-medium text-gray-400">/ Dashboard</span>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg text-gray-600 text-sm border border-gray-100">
                    <Calendar size={16} />
                    <span>{currentDate || "Carregando..."}</span>
                </div>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 pl-4 border-l border-gray-100 hover:opacity-80 transition-opacity"
                    >
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
                            AD
                        </div>
                        <span className="text-sm font-bold text-gray-700 hidden sm:block">Administrador</span>
                        <ChevronDown size={14} className={`text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50 animate-in fade-in zoom-in duration-150">
                            <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                <p className="text-xs text-gray-400 font-medium">Conta atual</p>
                                <p className="text-sm font-bold text-gray-800">admin@loja.com</p>
                            </div>

                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                <Users size={16} />
                                Trocar de conta
                            </button>

                            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                                <UserPlus size={16} />
                                Adicionar outra conta
                            </button>

                            <div className="border-t border-gray-50 mt-1 pt-1">
                                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
                                    <LogOut size={16} />
                                    Sair da conta
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};
