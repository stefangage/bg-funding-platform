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
    ExternalLink,
    ChevronLeft,
    ChevronRight
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
    isCollapsed?: boolean;
    onToggleCollapse?: () => void;
}

const navItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', labelBg: 'Табло' },
    { href: '/companies', icon: Building2, label: 'Companies', labelBg: 'Компании' },
    { href: '/funding', icon: Wallet, label: 'Funding', labelBg: 'Финансиране' },
    { href: '/applications', icon: FileText, label: 'Applications', labelBg: 'Кандидатури' },
    { href: '/settings', icon: Settings, label: 'Settings', labelBg: 'Настройки' },
];

export function Sidebar({ companies, selectedCompanyId, onSelectCompany, isCollapsed = false, onToggleCollapse }: SidebarProps) {
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
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">BG</span>
                    </div>
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
          fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-40
          transform transition-all duration-300 ease-in-out
          lg:translate-x-0
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'w-20' : 'w-72'}
        `}
            >
                <div className="flex flex-col h-full relative">
                    {/* Toggle Button (Desktop Only) */}
                    {onToggleCollapse && (
                        <button
                            onClick={onToggleCollapse}
                            className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full items-center justify-center text-gray-500 hover:text-orange-600 hover:border-orange-200 shadow-sm z-[60] transition-colors"
                        >
                            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                        </button>
                    )}

                    {/* Logo */}
                    <div className={`h-16 flex items-center gap-3 border-b border-gray-200 ${isCollapsed ? 'justify-center px-0' : 'px-6'}`}>
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex-shrink-0 flex items-center justify-center shadow-lg shadow-orange-500/20">
                            <span className="text-white font-bold">BG</span>
                        </div>
                        {!isCollapsed && (
                            <div className="animate-fade-in whitespace-nowrap overflow-hidden">
                                <h1 className="font-bold text-gray-900">BG Funding</h1>
                                <p className="text-xs text-gray-500">Платформа за финансиране</p>
                            </div>
                        )}
                    </div>

                    {/* Company Selector */}
                    <div className={`p-4 border-b border-gray-200 ${isCollapsed ? 'px-2' : ''}`}>
                        <button
                            onClick={() => !isCollapsed && setIsCompanyDropdownOpen(!isCompanyDropdownOpen)}
                            className={`w-full flex items-center justify-between transition-colors rounded-xl ${isCollapsed ? 'p-2 justify-center bg-transparent' : 'p-3 bg-gray-50 hover:bg-gray-100'}`}
                            title={isCollapsed ? selectedCompany?.name : undefined}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 bg-cyan-100 rounded-lg flex-shrink-0 flex items-center justify-center ${isCollapsed ? 'ring-2 ring-cyan-500 ring-offset-2' : ''}`}>
                                    <Building2 size={20} className="text-cyan-600" />
                                </div>
                                {!isCollapsed && (
                                    <div className="text-left animate-fade-in whitespace-nowrap overflow-hidden">
                                        <p className="font-medium text-gray-900 text-sm truncate max-w-[140px]">
                                            {selectedCompany?.name || 'Select Company'}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {companies.length} {companies.length === 1 ? 'company' : 'companies'}
                                        </p>
                                    </div>
                                )}
                            </div>
                            {!isCollapsed && (
                                <ChevronDown
                                    size={20}
                                    className={`text-gray-400 transition-transform ${isCompanyDropdownOpen ? 'rotate-180' : ''}`}
                                />
                            )}
                        </button>

                        {!isCollapsed && isCompanyDropdownOpen && (
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
                      ${company.id === selectedCompanyId ? 'bg-orange-50' : ''}
                    `}
                                    >
                                        <div className={`
                       w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center
                      ${company.id === selectedCompanyId ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}
                    `}>
                                            <Building2 size={16} />
                                        </div>
                                        <span className={`text-sm truncate ${company.id === selectedCompanyId ? 'font-medium text-orange-600' : 'text-gray-700'}`}>
                                            {company.name}
                                        </span>
                                    </button>
                                ))}
                                <Link
                                    href="/companies/new"
                                    className="flex items-center gap-3 p-3 border-t border-gray-100 hover:bg-gray-50 transition-colors text-orange-600"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex-shrink-0 flex items-center justify-center">
                                        <Plus size={16} />
                                    </div>
                                    <span className="text-sm font-medium">Add Company</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Navigation */}
                    <nav className={`flex-1 p-4 space-y-1 ${isCollapsed ? 'px-2' : ''}`}>
                        {navItems.map(item => {
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    title={isCollapsed ? item.label : undefined}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`
                    flex items-center rounded-xl transition-all
                    ${isCollapsed ? 'justify-center p-3' : 'px-4 py-3 gap-3'}
                    ${isActive
                                            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }
                  `}
                                >
                                    <item.icon size={20} className="flex-shrink-0" />
                                    {!isCollapsed && <span className="font-medium animate-fade-in">{item.label}</span>}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Official Sources */}
                    {!isCollapsed && (
                        <div className="p-4 border-t border-gray-200 animate-fade-in">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                                Official Sources
                            </p>
                            <div className="space-y-2">
                                <a
                                    href="https://eumis2020.government.bg"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-cyan-600 transition-colors"
                                >
                                    <ExternalLink size={14} />
                                    ИСУН 2020
                                </a>
                                <a
                                    href="https://eufunds.bg"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-cyan-600 transition-colors"
                                >
                                    <ExternalLink size={14} />
                                    euFunds.bg
                                </a>
                            </div>
                        </div>
                    )}

                    {/* User */}
                    <div className={`p-4 border-t border-gray-200 ${isCollapsed ? 'px-2' : ''}`}>
                        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex-shrink-0 flex items-center justify-center text-white font-medium shadow-sm">
                                U
                            </div>
                            {!isCollapsed && (
                                <>
                                    <div className="flex-1 min-w-0 animate-fade-in">
                                        <p className="font-medium text-gray-900 text-sm truncate">User</p>
                                        <p className="text-xs text-gray-500 truncate">user@example.com</p>
                                    </div>
                                    <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                        <LogOut size={18} />
                                    </button>
                                </>
                            )}
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
            <div className="flex-1 max-w-md ml-4">
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
