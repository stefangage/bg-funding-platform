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
        <div className="card hover:border-blue-300 transition-all group animate-slide-up" style={{ animationDelay: `${rank * 0.1}s` }}>
            <div className="flex items-start gap-4">
                {/* Rank */}
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                    {getRankIcon(rank)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                            <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {program.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-0.5">{program.operationalProgram}</p>
                        </div>
                        <div className={`match-score ${getMatchScoreStyle(program.matchScore)}`}>
                            <CheckCircle2 size={14} />
                            {program.matchScore}% Match
                        </div>
                    </div>

                    {/* Details Row */}
                    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-600">
                            <Euro size={16} className="text-green-600" />
                            <span>
                                {formatCurrency(program.minAmount)} – {formatCurrency(program.maxAmount)}
                            </span>
                        </div>
                        <div className={`flex items-center gap-1.5 ${deadline.class}`}>
                            {deadline.icon}
                            <span>{deadline.label}</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-gray-100">
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
                                className="ml-auto text-gray-400 hover:text-blue-600 transition-colors"
                                title="View on ИСУН 2020"
                            >
                                <ExternalLink size={18} />
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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                    <p className="text-sm text-gray-500 mt-1">Based on your company profile</p>
                </div>
                {showViewAll && (
                    <Link href="/funding" className="btn btn-ghost text-sm">
                        View All
                        <ArrowRight size={16} />
                    </Link>
                )}
            </div>

            <div className="space-y-4">
                {programs.map((program, index) => (
                    <FundingCard key={program.id} program={program} rank={index + 1} />
                ))}
            </div>
        </div>
    );
}
