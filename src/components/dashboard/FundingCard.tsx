'use client';

import Link from 'next/link';
import { format, differenceInDays } from 'date-fns';
import {
    Trophy,
    Medal,
    Award,
    Calendar,
    Euro,
    ArrowRight,
    ExternalLink,
    CheckCircle2,
    AlertCircle,
    Clock
} from 'lucide-react';

interface FundingProgram {
    id: string;
    code?: string;
    name: string;
    nameBg: string;
    operationalProgram: string;
    minAmount: number;
    maxAmount: number;
    closeDate: Date;
    matchScore: number;
    isunUrl?: string;
}

interface FundingCardProps {
    program: FundingProgram;
    rank: number;
}

function getMatchScoreStyle(score: number) {
    if (score >= 85) return 'match-score-high';
    if (score >= 60) return 'match-score-medium';
    return 'match-score-low';
}

function getRankIcon(rank: number) {
    switch (rank) {
        case 1:
            return <Trophy size={20} className="text-yellow-500" />;
        case 2:
            return <Medal size={20} className="text-gray-400" />;
        case 3:
            return <Award size={20} className="text-amber-600" />;
        default:
            return <span className="text-gray-400 font-medium">{rank}</span>;
    }
}

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-EU', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
    }).format(amount);
}

function getDeadlineStatus(closeDate: Date) {
    const daysLeft = differenceInDays(closeDate, new Date());

    if (daysLeft <= 7) {
        return { label: `${daysLeft} days left`, class: 'deadline-urgent', icon: <AlertCircle size={14} /> };
    }
    if (daysLeft <= 30) {
        return { label: `${daysLeft} days left`, class: 'deadline-soon', icon: <Clock size={14} /> };
    }
    return { label: `${daysLeft} days left`, class: 'deadline-safe', icon: <Calendar size={14} /> };
}

export function FundingCard({ program, rank }: FundingCardProps) {
    const deadline = getDeadlineStatus(program.closeDate);

    return (
        <div className="funding-card hover:border-orange-300 transition-all group animate-slide-up" style={{ animationDelay: `${rank * 0.1}s` }}>
            <div className="flex items-start gap-6">
                {/* Rank */}
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                    {getRankIcon(rank)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-6">
                        <div className="space-y-2 flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 text-lg group-hover:text-orange-600 transition-colors leading-snug">
                                {program.name}
                            </h3>
                            {program.code && (
                                <span className="inline-block text-xs font-mono bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded-md">
                                    {program.code}
                                </span>
                            )}
                            <p className="text-sm text-gray-500 mt-2">{program.operationalProgram}</p>
                        </div>
                        <div className={`match-score ${getMatchScoreStyle(program.matchScore)} flex-shrink-0`}>
                            <CheckCircle2 size={14} />
                            {program.matchScore}% Match
                        </div>
                    </div>

                    {/* Details Row */}
                    <div className="flex flex-wrap items-center gap-6 mt-5 pt-4 text-sm border-t border-gray-50">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Euro size={16} className="text-green-600 flex-shrink-0" />
                            <span className="font-medium">
                                {formatCurrency(program.minAmount)} – {formatCurrency(program.maxAmount)}
                            </span>
                        </div>
                        <div className={`flex items-center gap-1.5 ${deadline.class}`}>
                            {deadline.icon}
                            <span>{deadline.label}</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3 mt-5 pt-5 border-t border-gray-100">
                        <Link
                            href={`/funding/${program.id}`}
                            className="btn btn-ghost text-sm py-2 px-4"
                        >
                            View Details
                            <ArrowRight size={16} />
                        </Link>
                        <Link
                            href={`/applications/new/${program.id}`}
                            className="btn btn-primary text-sm py-2 px-4"
                        >
                            Start Application
                        </Link>
                        {program.isunUrl && (
                            <a
                                href={program.isunUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-auto flex items-center gap-2 text-sm text-cyan-600 hover:text-cyan-700 font-medium transition-colors"
                                title="View on ИСУН 2020"
                            >
                                <ExternalLink size={16} />
                                ИСУН 2020
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface FundingListProps {
    programs: FundingProgram[];
    title?: string;
    showViewAll?: boolean;
}

export function FundingList({ programs, title = "Top Recommendations", showViewAll = true }: FundingListProps) {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                    <p className="text-sm text-gray-500 mt-2">Based on your company profile</p>
                </div>
                {showViewAll && (
                    <Link href="/funding" className="btn btn-ghost text-sm">
                        View All
                        <ArrowRight size={16} />
                    </Link>
                )}
            </div>

            <div className="space-y-5">
                {programs.map((program, index) => (
                    <FundingCard key={program.id} program={program} rank={index + 1} />
                ))}
            </div>
        </div>
    );
}
