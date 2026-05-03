"use client";
import React, { useState } from 'react';

interface DataTableProps {
    title: string;
    headers: string[];
    children: React.ReactNode;
    actionButton?: React.ReactNode;
}

export const DataTable: React.FC<DataTableProps> = ({ title, headers, children, actionButton }) => {
    const [activePage, setActivePage] = useState(1);
    const pages = [1, 2, 3, 4, 5]; // Exemplo de páginas

    return (
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col h-full overflow-hidden">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-gray-800">{title}</h3>
                {actionButton}
            </div>

            <div className="flex-1 overflow-auto">
                <table className="w-full text-left">
                    <thead className="sticky top-0 bg-white z-10">
                        <tr className="border-b border-gray-50">
                            {headers.map((head) => (
                                <th key={head} className="pb-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{head}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">{children}</tbody>
                </table>
            </div>

            {/* PAGINAÇÃO COM FUNÇÃO DE ATIVO */}
            <div className="flex justify-center items-center gap-1.5 mt-4 pt-4 border-t border-gray-50">
                <button className="text-[10px] font-bold text-gray-400 hover:text-blue-600 px-2">Anterior</button>
                {pages.map((page) => (
                    <button
                        key={page}
                        onClick={() => setActivePage(page)}
                        className={`w-7 h-7 flex items-center justify-center rounded-lg text-[11px] font-bold transition-all ${activePage === page
                                ? 'bg-blue-600 text-white shadow-md'
                                : 'text-gray-500 hover:bg-gray-100'
                            }`}
                    >
                        {page}
                    </button>
                ))}
                <button className="text-[10px] font-bold text-gray-400 hover:text-blue-600 px-2">Próximo</button>
            </div>
        </div>
    );
};
