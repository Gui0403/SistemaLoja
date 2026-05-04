"use client";

import React, { useState } from 'react';
import { Produto } from "@/types/produto";
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { StatCard } from './components/StatCard';
import { BarChart2, DollarSign, Edit3, Package, Plus, ShoppingCart, Trash2, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { DataTable } from './components/Datatable';
import { useQuery } from '@tanstack/react-query';
import { getDashboardStats } from './services/dashboardService';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value || 0);

export default function DashboardPage() {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['dashboard-data'],
    queryFn: getDashboardStats,
    // Mantém os dados anteriores na tela enquanto busca novos (evita flickering)
    placeholderData: (previousData) => previousData,
    retry: 2, // Tenta 2 vezes antes de desistir
  });

  const stats = data?.stats || {
    vendasHoje: { valor: 0, quantidade: 0 },
    faturamentoMes: { valor: 0, crescimento: 0 },
    estoque: 0,
    lucro: 0,
    ticketMedio: 0
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden">
      <Sidebar isOpen={sidebarOpen} />

      <div className={`flex flex-col flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 p-6 overflow-y-auto">
          {/* Alerta de erro discreto caso o backend falhe */}
          {isError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-xs font-medium">
              Conexão com o servidor perdida. Exibindo dados locais.
            </div>
          )}

          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          </div>

          <section className="flex flex-wrap lg:flex-nowrap gap-4 mb-6">
            <StatCard
              title="Vendas Hoje"
              value={formatCurrency(stats?.vendasHoje?.valor)}
              subValue={`${stats?.vendasHoje?.quantidade || 0} vendas`}
              icon={ShoppingCart}
              color="bg-blue-500"
              isLoading={isLoading}
            />
            <StatCard
              title="Faturamento Mês"
              value={formatCurrency(stats?.faturamentoMes?.valor)}
              subValue={`+${stats?.faturamentoMes?.crescimento || 0}% vs mês anterior`}
              icon={TrendingUp}
              color="bg-emerald-500"
              isLoading={isLoading}
            />
            <StatCard
              title="Estoque Itens"
              value={(stats?.estoque || 0).toLocaleString()}
              subValue="produtos"
              icon={Package}
              color="bg-purple-500"
              isLoading={isLoading}
            />
            <StatCard
              title="Lucro Mês"
              value={formatCurrency(stats?.lucro)}
              subValue="+8% vs mês anterior"
              icon={DollarSign}
              color="bg-orange-500"
              isLoading={isLoading}
            />
            <StatCard
              title="Ticket Médio"
              value={formatCurrency(stats?.ticketMedio)}
              subValue="média por venda"
              icon={BarChart2}
              color="bg-sky-500"
              isLoading={isLoading}
            />
          </section>

          <div className="space-y-6">
            <div className="grid grid-cols-12 gap-6 h-[400px]">
              <div className="col-span-12 lg:col-span-7">
                <DataTable
                  title="Produtos"
                  headers={['Código', 'Produto', 'Categoria', 'Preço', 'Estoque', 'Ações']}
                  actionButton={
                    <Link href='/produtos/new'>
                      <button className="bg-blue-600 text-white text-xs px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors"><Plus size={14} />
                        Novo Produto
                      </button>
                    </Link>
                  }
                >
                  {(data?.produtosRecentes || []).map((prod) => (
                    <tr key={prod.id}>...</tr>
                  ))}
                </DataTable>
              </div>

              <div className="col-span-12 lg:col-span-5">
                <DataTable
                  title="Vendas Recentes"
                  headers={['Nº Venda', 'Cliente', 'Total', 'Status']}
                  // Adicionando o botão "Ver todas" no cabeçalho da tabela
                  actionButton={
                    <button className="text-[10px] font-bold text-blue-600 hover:text-blue-700 hover:underline transition-all">
                      Ver todas
                    </button>
                  }
                >
                  (data?.produtosRecentes || []).map((prod: Produto) => (
                    <tr key={prod.id}>...</tr>
                  ))}
                </DataTable>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[350px] pb-8 mt-15">
              <div className="h-full">
                <DataTable title="Estoque Baixo" headers={['Produto', 'Estoque', 'Mínimo']}>
                  {(data?.estoqueBaixo || []).map((prod) => (
                    <tr key={prod.id}>...</tr>
                  ))}
                </DataTable>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-800">Faturamento (Mês)</h3>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Mensal</span>
                </div>
                <div className="flex-1 bg-slate-50 rounded-lg flex items-center justify-center text-gray-300 italic border-2 border-dashed border-gray-100">
                  <div className="text-center">
                    <TrendingUp className="mx-auto mb-2 opacity-20" size={32} />
                    <p className="text-[10px]">Área do Gráfico de Faturamento</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col h-full">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-gray-800">Lucro (Mês)</h3>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Mensal</span>
                </div>
                <div className="flex-1 bg-slate-50 rounded-lg flex items-center justify-center text-gray-300 italic border-2 border-dashed border-gray-100">
                  <div className="text-center">
                    <BarChart2 className="mx-auto mb-2 opacity-20" size={32} />
                    <p className="text-[10px]">Área do Gráfico de Lucro</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
