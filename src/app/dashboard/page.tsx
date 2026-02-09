'use client';

import { DashboardLayout } from '@/components/layout';
import { DashboardStats, FundingList, UpcomingDeadlines, DeadlineCalendar } from '@/components/dashboard';
import { Building2, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

// Demo data - will be replaced with real API calls
const DEMO_FUNDING_PROGRAMS = [
    {
        id: '1',
        name: 'Programme "Education" 2021-2027',
        nameBg: 'Програма "Образование" 2021-2027',
        operationalProgram: 'Digital Educational Content Development',
        minAmount: 50000,
        maxAmount: 200000,
        closeDate: new Date('2026-04-15'),
        matchScore: 94,
        isunUrl: 'https://eumis2020.government.bg',
    },
    {
        id: '2',
        name: 'ESF+ Skills for Green & Digital Transition',
        nameBg: 'ЕСФ+ Умения за зелен и дигитален преход',
        operationalProgram: 'Teacher Digital Competence Training',
        minAmount: 30000,
        maxAmount: 150000,
        closeDate: new Date('2026-05-30'),
        matchScore: 87,
        isunUrl: 'https://eumis2020.government.bg',
    },
    {
        id: '3',
        name: 'Digitalization for Micro & Small Enterprises',
        nameBg: 'Дигитализация за микро и малки предприятия',
        operationalProgram: 'ICT Solutions Implementation',
        minAmount: 2560,
        maxAmount: 25600,
        closeDate: new Date('2026-02-28'),
        matchScore: 82,
        isunUrl: 'https://eumis2020.government.bg',
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
            <div className="mb-8">
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
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
            <div className="mt-8 p-6 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl text-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-semibold">🚨 Urgent: Digitalization Grant Closes in 20 Days</h3>
                        <p className="text-blue-100 mt-1">
                            Your EduAI Bulgaria and TutorHub companies are eligible for up to €25,600
                        </p>
                    </div>
                    <Link
                        href="/applications/new/3"
                        className="btn bg-white text-blue-600 hover:bg-blue-50 flex-shrink-0"
                    >
                        Quick Apply
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </DashboardLayout>
    );
}
