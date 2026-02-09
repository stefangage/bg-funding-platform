'use client';

import { ReactNode, useState } from 'react';
import { Sidebar, TopBar } from './Sidebar';

// Demo companies for initial development
const DEMO_COMPANIES = [
    { id: '1', name: 'EduAI Bulgaria ЕООД', nameBg: 'ЕдуАИ България ЕООД' },
    { id: '2', name: '3D Print Labs ООД', nameBg: '3Д Принт Лабс ООД' },
    { id: '3', name: 'TutorHub ЕООД', nameBg: 'ТуторХъб ЕООД' },
];

interface DashboardLayoutProps {
    children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const [selectedCompanyId, setSelectedCompanyId] = useState<string>(DEMO_COMPANIES[0].id);

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar
                companies={DEMO_COMPANIES}
                selectedCompanyId={selectedCompanyId}
                onSelectCompany={setSelectedCompanyId}
            />

            {/* Main Content */}
            <div className="lg:pl-72">
                <TopBar />

                {/* Page Content */}
                <main className="pt-16 lg:pt-0">
                    <div className="p-6 lg:p-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
