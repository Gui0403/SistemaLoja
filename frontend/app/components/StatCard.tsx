import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    subValue?: string;
    icon: LucideIcon;
    color: string;
    isLoading?: boolean; // Preparado para o estado de loading da API
}

export const StatCard: React.FC<StatCardProps> = ({
    title, value, subValue, icon: Icon, color, isLoading
}) => {
    if (isLoading) {
        return (
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm animate-pulse flex-1">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full" />
                    <div className="flex-1 space-y-2">
                        <div className="h-2 bg-gray-200 rounded w-1/2" />
                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4 flex-1 transition-all hover:shadow-md">
            <div className={`p-3 rounded-full ${color} text-white shadow-sm`}>
                <Icon size={22} />
            </div>
            <div>
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-tight leading-none mb-1">
                    {title}
                </p>
                <h3 className="text-xl font-extrabold text-gray-800 leading-tight">
                    {value}
                </h3>
                {subValue && (
                    <p className="text-[10px] text-gray-400 font-medium mt-0.5">
                        {subValue}
                    </p>
                )}
            </div>
        </div>
    );
};
