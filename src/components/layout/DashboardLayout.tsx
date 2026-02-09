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
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar
                companies={DEMO_COMPANIES}
                selectedCompanyId={selectedCompanyId}
                onSelectCompany={setSelectedCompanyId}
                isCollapsed={isSidebarCollapsed}
                onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            />

            {/* Main Content - uses custom CSS for sidebar offset */}
            <div
                className={`dashboard-main min-h-screen flex flex-col ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}
            >
                <TopBar />

                {/* Page Content */}
                <main className="pt-16 lg:pt-0 flex-1">
                    <div className="p-6 sm:p-8 lg:p-10 xl:p-12 max-w-[1600px] mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

