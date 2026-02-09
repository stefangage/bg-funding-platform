'use client';

import { DashboardLayout } from '@/components/layout';
import { DashboardStats, FundingList, UpcomingDeadlines, DeadlineCalendar } from '@/components/dashboard';
import { Building2, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

// Real funding data from ИСУН 2020 (https://eumis2020.government.bg)
const DEMO_FUNDING_PROGRAMS = [
    {
        id: '1',
        code: 'BG05SFPR001-1.002',
        name: 'Access to Education for Every Child',
        nameBg: 'Достъп до образование за всяко дете',
        operationalProgram: 'Програма "Образование" 2021-2027',
        minAmount: 50000,
        maxAmount: 500000,
        closeDate: new Date('2026-06-30'),
        matchScore: 94,
        isunUrl: 'https://eumis2020.government.bg/bg/s/Procedure/Info/BG05SFPR001-1.002',
    },
    {
        id: '2',
        code: 'BG05SFPR002-1.027',
        name: 'Choose Bulgaria - Component 2',
        nameBg: 'Избирам България - Компонент 2',
        operationalProgram: 'Програма "Развитие на човешките ресурси" 2021-2027',
        minAmount: 30000,
        maxAmount: 200000,
        closeDate: new Date('2026-05-15'),
        matchScore: 87,
        isunUrl: 'https://eumis2020.government.bg/bg/s/Procedure/Info/BG05SFPR002-1.027',
    },
    {
        id: '3',
        code: 'BG16FFPR001-3.004',
        name: 'EV Charging Infrastructure on Roads',
        nameBg: 'Зарядна инфраструктура за електрически превозни средства',
        operationalProgram: 'Програма "Транспортна свързаност" 2021-2027',
        minAmount: 100000,
        maxAmount: 1000000,
        closeDate: new Date('2026-08-31'),
        matchScore: 78,
        isunUrl: 'https://eumis2020.government.bg/bg/s/Procedure/Info/BG16FFPR001-3.004',
    },
    {
        id: '4',
        code: 'BG05SFPR001-3.006',
        name: 'Modernization of Higher Education 2.0',
        nameBg: 'Модернизация на висшите училища 2.0',
        operationalProgram: 'Програма "Образование" 2021-2027',
        minAmount: 100000,
        maxAmount: 800000,
        closeDate: new Date('2026-07-15'),
        matchScore: 72,
        isunUrl: 'https://eumis2020.government.bg/bg/s/Procedure/Info/BG05SFPR001-3.006',
    },
];

const DEMO_DEADLINES = [
    {
        id: '1',
        title: 'Digitalization Grant Application',
        date: new Date('2026-02-28'),
        type: 'funding' as const,
        companyName: 'EduAI Bulgaria',
    },
    {
        id: '2',
        title: 'Upload 2025 Financial Statements',
        date: new Date('2026-02-15'),
        type: 'document' as const,
        companyName: 'EduAI Bulgaria',
    },
    {
        id: '3',
        title: 'Programme Education Deadline',
        date: new Date('2026-04-15'),
        type: 'funding' as const,
        companyName: 'EduAI Bulgaria',
    },
    {
        id: '4',
        title: 'NRA Certificate Renewal',
        date: new Date('2026-03-01'),
        type: 'document' as const,
        companyName: '3D Print Labs',
    },
];

export default function DashboardPage() {
    return (
        <DashboardLayout>
            {/* Header */}
            <div className="mb-10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Welcome back! 👋
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Here's what's happening with your funding opportunities
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/companies" className="btn btn-secondary">
                            <Building2 size={18} />
                            Manage Companies
                        </Link>
                        <Link href="/funding" className="btn btn-primary">
                            <Sparkles size={18} />
                            Find Funding
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <DashboardStats
                matchingPrograms={8}
                closingSoon={3}
                activeApplications={1}
                totalPotentialFunding="€2.4M"
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-12">
                {/* Funding Recommendations - Takes 2 columns */}
                <div className="lg:col-span-2">
                    <FundingList programs={DEMO_FUNDING_PROGRAMS} />
                </div>

                {/* Sidebar - Calendar and Deadlines */}
                <div className="space-y-6">
                    <DeadlineCalendar deadlines={DEMO_DEADLINES} />
                    <UpcomingDeadlines deadlines={DEMO_DEADLINES} />
                </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-10 p-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl text-white shadow-lg">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold">🚨 Urgent: Education Grant Closes Soon</h3>
                        <p className="text-orange-100 mt-1">
                            Your EduAI Bulgaria company is eligible for up to €500,000
                        </p>
                    </div>
                    <Link
                        href="/applications/new/1"
                        className="btn bg-white text-orange-600 hover:bg-orange-50 flex-shrink-0"
                    >
                        Quick Apply
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
}
