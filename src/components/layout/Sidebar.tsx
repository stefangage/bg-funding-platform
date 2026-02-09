'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Building2,
    Wallet,
    FileText,
    Settings,
    ChevronDown,
    Plus,
    LogOut,
    Menu,
    X,
    Bell,
    Search,
    ExternalLink
} from 'lucide-react';

interface Company {
    id: string;
    name: string;
    nameBg?: string;
}

interface SidebarProps {
    companies: Company[];
    selectedCompanyId: string | null;
    onSelectCompany: (id: string) => void;
}

const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', labelBg: 'Табло' },
    { href: '/companies', icon: Building2, label: 'Companies', labelBg: 'Компании' },
    { href: '/funding', icon: Wallet, label: 'Funding', labelBg: 'Финансиране' },
    { href: '/applications', icon: FileText, label: 'Applications', labelBg: 'Кандидатури' },
    { href: '/settings', icon: Settings, label: 'Settings', labelBg: 'Настройки' },
];

export function Sidebar({ companies, selectedCompanyId, onSelectCompany }: SidebarProps) {
    const pathname = usePathname();
    const [isCompanyDropdownOpen, setIsCompanyDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const selectedCompany = companies.find(c => c.id === selectedCompanyId);

    return (
        <>
            {/* Mobile Header */}
            <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center justify-between px-4">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">BG</span>
                    </div>
                    <span className="font-semibold text-gray-900">Funding Platform</span>
                </div>
                <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                    <Bell size={24} />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
            </header>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 z-50
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="h-16 flex items-center gap-3 px-6 border-b border-gray-200">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <span className="text-white font-bold">BG</span>
                        </div>
                        <div>
                            <h1 className="font-bold text-gray-900">BG Funding</h1>
                            <p className="text-xs text-gray-500">Платформа за финансиране</p>
                        </div>
                    </div>

                    {/* Company Selector */}
                    <div className="p-4 border-b border-gray-200">
                        <button
                            onClick={() => setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
                            className="w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Building2 size={20} className="text-blue-600" />
                                </div>
                                <div className="text-left">
                                    <p className="font-medium text-gray-900 text-sm truncate max-w-[140px]">
                                        {selectedCompany?.name || 'Select Company'}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {companies.length} {companies.length === 1 ? 'company' : 'companies'}
                                    </p>
                                </div>
                            </div>
                            <ChevronDown
                                size={20}
                                className={`text-gray-400 transition-transform ${isCompanyDropdownOpen ? 'rotate-180' : ''}`}
                            />
                        </button>

                        {isCompanyDropdownOpen && (
                            <div className="mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden animate-fade-in">
                                {companies.map(company => (
                                    <button
                                        key={company.id}
                                        onClick={() => {
                                            onSelectCompany(company.id);
                                            setIsCompanyDropdownOpen(false);
                                        }}
                                        className={`
                      w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors
                      ${company.id === selectedCompanyId ? 'bg-blue-50' : ''}
                    `}
                                    >
                                        <div className={`
                      w-8 h-8 rounded-lg flex items-center justify-center
                      ${company.id === selectedCompanyId ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}
                    `}>
                                            <Building2 size={16} />
                                        </div>
                                        <span className={`text-sm ${company.id === selectedCompanyId ? 'font-medium text-blue-600' : 'text-gray-700'}`}>
                                            {company.name}
                                        </span>
                                    </button>
                                ))}
                                <Link
                                    href="/companies/new"
                                    className="flex items-center gap-3 p-3 border-t border-gray-100 hover:bg-gray-50 transition-colors text-blue-600"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                                        <Plus size={16} />
                                    </div>
                                    <span className="text-sm font-medium">Add Company</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-4 space-y-1">
                        {navItems.map(item => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                    ${isActive
                                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }
                  `}
                                >
                                    <item.icon size={20} />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Official Sources */}
                    <div className="p-4 border-t border-gray-200">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                            Official Sources
                        </p>
                        <div className="space-y-2">
                            <a
                                href="https://eumis2020.government.bg"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                <ExternalLink size={14} />
                                ИСУН 2020
                            </a>
                            <a
                                href="https://eufunds.bg"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                            >
                                <ExternalLink size={14} />
                                euFunds.bg
                            </a>
                        </div>
                    </div>

                    {/* User */}
                    <div className="p-4 border-t border-gray-200">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-medium">
                                U
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 text-sm truncate">User</p>
                                <p className="text-xs text-gray-500 truncate">user@example.com</p>
                            </div>
                            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}

export function SearchBar() {
    return (
        <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                placeholder="Search funding programs..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
        </div>
    );
}

export function TopBar() {
    return (
        <div className="hidden lg:flex items-center justify-between h-16 px-8 border-b border-gray-200 bg-white">
            <div className="flex-1 max-w-xl">
                <SearchBar />
            </div>
            <div className="flex items-center gap-4">
                <button className="p-2 rounded-lg hover:bg-gray-100 relative">
                    <Bell size={20} className="text-gray-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
            </div>
        </div>
    );
}
