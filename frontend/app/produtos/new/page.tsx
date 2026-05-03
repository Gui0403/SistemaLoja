"use client";

import React, { useState } from 'react';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { Save, X, Package, DollarSign, Tag, Hash } from 'lucide-react';
import Link from 'next/link';

export default function NovoProduto() {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden">
            <Sidebar isOpen={sidebarOpen} />

            <div className={`flex flex-col flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

                <main className="flex-1 p-8 overflow-y-auto">
                    {/* Cabeçalho da Página */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Cadastrar Novo Produto</h1>
                            <p className="text-sm text-gray-400">Preencha as informações para adicionar ao estoque</p>
                        </div>

                        <div className="flex gap-3">
                            <Link href="/">
                                <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-500 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                                    <X size={16} /> Cancelar
                                </button>
                            </Link>
                            <button className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md shadow-blue-100 transition-all">
                                <Save size={16} /> Salvar Produto
                            </button>
                        </div>
                    </div>

                    {/* Formulário Estilizado */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-4xl">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Nome do Produto */}
                            <div className="col-span-2 space-y-2">
                                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">Nome do Produto</label>
                                <div className="relative">
                                    <Package className="absolute left-3 top-3 text-gray-300" size={18} />
                                    <input type="text" placeholder="Ex: Teclado Mecânico RGB" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                                </div>
                            </div>

                            {/* Código SKU */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">Código SKU</label>
                                <div className="relative">
                                    <Hash className="absolute left-3 top-3 text-gray-300" size={18} />
                                    <input type="text" placeholder="PROD-001" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
                                </div>
                            </div>

                            {/* Categoria */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">Categoria</label>
                                <div className="relative">
                                    <Tag className="absolute left-3 top-3 text-gray-300" size={18} />
                                    <select className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none">
                                        <option>Eletrônicos</option>
                                        <option>Periféricos</option>
                                        <option>Acessórios</option>
                                    </select>
                                </div>
                            </div>

                            {/* Preço de Custo */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">Preço de Custo</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-3 text-gray-300" size={18} />
                                    <input type="number" placeholder="0,00" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
                                </div>
                            </div>

                            {/* Preço de Venda */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">Preço de Venda</label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-3 text-emerald-400" size={18} />
                                    <input type="number" placeholder="0,00" className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold text-emerald-600" />
                                </div>
                            </div>

                            {/* Estoque Atual */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">Estoque Inicial</label>
                                <input type="number" placeholder="0" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
                            </div>

                            {/* Estoque Mínimo */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-800 uppercase tracking-wider">Estoque Mínimo (Alerta)</label>
                                <input type="number" placeholder="10" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all" />
                            </div>

                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
