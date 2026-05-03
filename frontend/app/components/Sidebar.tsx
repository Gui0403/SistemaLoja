"use client";

import React, { useState } from 'react';
import {
    LayoutDashboard, Package, ShoppingCart,
    Database, BarChart3, TrendingUp, FileText,
    Settings, LogOut
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
    isOpen: boolean;
}

// 1. Atualizamos a interface do NavItem para aceitar a função de clique
interface NavItemProps {
    icon: React.ElementType;
    label: string;
    active: boolean;
    isOpen: boolean;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, active, isOpen, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 w-full ${active ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-blue-50'
            }`}
    >
        <Icon size={20} className="min-w-[20px]" />
        {isOpen && <span className="font-medium text-sm whitespace-nowrap">{label}</span>}
    </button>
);

export const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
    // 2. Estado para controlar qual item está ativo (começamos com 'Dashboard')
    const [activeItem, setActiveItem] = useState('Dashboard');

    // Lista de itens para facilitar a renderização dinâmica
    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Package, label: 'Produtos', path: '/produtos' },
        { icon: ShoppingCart, label: 'Vendas', path: '/vendas' },
        { icon: Database, label: 'Estoque', path: '/estoque' },
        { icon: BarChart3, label: 'Faturamento', path: '/faturamento' },
        { icon: TrendingUp, label: 'Lucro', path: '/lucro' },
        { icon: FileText, label: 'Relatórios', path: '/relatorios' },
        { icon: Settings, label: 'Configurações', path: '/configuracoes' },
    ];

    return (
        <aside className={`bg-white border-r border-gray-200 flex flex-col p-4 fixed h-full transition-all duration-300 z-50 ${isOpen ? 'w-64' : 'w-20'
            }`}>
            <div className="flex items-center mb-10 px-2">
                <div className="bg-blue-600 p-1.5 rounded text-white font-bold text-xs">LG</div>
                {isOpen && (
                    <div className="ml-3">
                        <h1 className="font-bold text-gray-800 text-sm leading-none">Loja Gestão</h1>
                        <p className="text-[10px] text-gray-400">Sistema de Vendas</p>
                    </div>
                )}
            </div>

            <nav className="space-y-1 flex-1">
                {menuItems.map((item) => (
                    <Link href={item.path} key={item.label}>
                        <NavItem
                            icon={item.icon}
                            label={item.label}
                            isOpen={isOpen}
                            active={usePathname() === item.path}
                            onClick={() => { }}
                        />
                    </Link>
                ))}
            </nav>

            <div className="border-t pt-4">
                <NavItem
                    icon={LogOut}
                    label="Sair"
                    isOpen={isOpen}
                    active={activeItem === 'Sair'}
                    onClick={() => setActiveItem('Sair')}
                />
                {isOpen && (
                    <p className="text-[9px] text-gray-400 mt-4 px-2 leading-tight">
                        © 2024 Loja Gestão<br />Todos os direitos reservados.
                    </p>
                )}
            </div>
        </aside>
    );
};
