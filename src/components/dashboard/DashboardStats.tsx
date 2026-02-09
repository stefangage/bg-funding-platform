'use client';

import { Target, Clock, FileText, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
    icon: React.ReactNode;
    value: number | string;
    label: string;
    sublabel?: string;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    color?: 'blue' | 'green' | 'orange' | 'purple';
}

function StatCard({ icon, value, label, sublabel, trend, color = 'blue' }: StatCardProps) {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        orange: 'bg-orange-50 text-orange-600',
        purple: 'bg-purple-50 text-purple-600',
    };

    return (
        <div className="card animate-fade-in">
            <div className="flex items-start justify-between">
                <div className={`w-12 h-12 rounded-xl ${colorClasses[color]} flex items-center justify-center`}>
                    {icon}
                </div>
                {trend && (
                    <div className={`flex items-center gap-1 text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-500'}`}>
                        {trend.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        {trend.value}%
                    </div>
                )}
            </div>
            <div className="mt-4">
                <p className="text-3xl font-bold text-gray-900">{value}</p>
                <p className="text-sm text-gray-600 mt-1">{label}</p>
                {sublabel && <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>}
            </div>
        </div>
    );
}

interface DashboardStatsProps {
    matchingPrograms: number;
    closingSoon: number;
    activeApplications: number;
    totalPotentialFunding: string;
}

export function DashboardStats({
    matchingPrograms,
    closingSoon,
    activeApplications,
    totalPotentialFunding
}: DashboardStatsProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
                icon={<Target size={24} />}
                value={matchingPrograms}
                label="Matching Programs"
                sublabel="Based on your profile"
                color="blue"
            />
            <StatCard
                icon={<Clock size={24} />}
                value={closingSoon}
                label="Closing Soon"
                sublabel="< 30 days remaining"
                color="orange"
            />
            <StatCard
                icon={<FileText size={24} />}
                value={activeApplications}
                label="Active Applications"
                sublabel="In progress"
                color="purple"
            />
            <StatCard
                icon={<TrendingUp size={24} />}
                value={totalPotentialFunding}
                label="Potential Funding"
                sublabel="Total available"
                color="green"
            />
        </div>
    );
}
