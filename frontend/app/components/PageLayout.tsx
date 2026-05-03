"use client";

import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';

interface PageLayoutProps {
    title: string;
    children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ title, children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden">
            <Sidebar isOpen={sidebarOpen} />
            <div className={`flex flex-col flex-1 transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
                <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
                <main className="flex-1 p-8 overflow-y-auto">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">{title}</h1>
                    {children}
                </main>
            </div>
        </div>
    );
};
