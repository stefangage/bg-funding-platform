'use client';

import Link from 'next/link';
import { format, differenceInDays } from 'date-fns';
import { Calendar, AlertTriangle, Clock, CheckCircle } from 'lucide-react';

interface Deadline {
    id: string;
    title: string;
    date: Date;
    type: 'funding' | 'task' | 'document';
    companyName?: string;
}

interface DeadlineItemProps {
    deadline: Deadline;
}

function DeadlineItem({ deadline }: DeadlineItemProps) {
    const daysLeft = differenceInDays(deadline.date, new Date());

    let statusColor = 'text-gray-600';
    let bgColor = 'bg-gray-100';
    let icon = <Calendar size={16} />;

    if (daysLeft <= 7) {
        statusColor = 'text-red-600';
        bgColor = 'bg-red-100';
        icon = <AlertTriangle size={16} />;
    } else if (daysLeft <= 30) {
        statusColor = 'text-orange-600';
        bgColor = 'bg-orange-100';
        icon = <Clock size={16} />;
    }

    return (
        <div className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
            <div className={`w-10 h-10 rounded-lg ${bgColor} ${statusColor} flex items-center justify-center flex-shrink-0`}>
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{deadline.title}</p>
                {deadline.companyName && (
                    <p className="text-xs text-gray-500">{deadline.companyName}</p>
                )}
            </div>
            <div className="text-right flex-shrink-0">
                <p className={`font-semibold ${statusColor}`}>
                    {daysLeft <= 0 ? 'Today' : `${daysLeft}d`}
                </p>
                <p className="text-xs text-gray-400">
                    {format(deadline.date, 'MMM d')}
                </p>
            </div>
        </div>
    );
}

interface UpcomingDeadlinesProps {
    deadlines: Deadline[];
}

export function UpcomingDeadlines({ deadlines }: UpcomingDeadlinesProps) {
    const sortedDeadlines = [...deadlines].sort((a, b) => a.date.getTime() - b.date.getTime());

    return (
        <div className="card">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-gray-100">
                <h3 className="font-semibold text-gray-900">Upcoming Deadlines</h3>
                <span className="badge badge-info">{deadlines.length} total</span>
            </div>

            {sortedDeadlines.length > 0 ? (
                <div className="divide-y divide-gray-100">
                    {sortedDeadlines.slice(0, 5).map((deadline) => (
                        <DeadlineItem key={deadline.id} deadline={deadline} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 text-gray-500">
                    <CheckCircle size={40} className="mx-auto mb-2 text-green-500" />
                    <p>No upcoming deadlines</p>
                </div>
            )}

            {deadlines.length > 5 && (
                <Link href="/applications" className="btn btn-ghost w-full mt-4 text-sm">
                    View all deadlines
                </Link>
            )}
        </div>
    );
}

// Calendar Mini View
interface CalendarDay {
    date: Date;
    isCurrentMonth: boolean;
    hasDeadline: boolean;
    isUrgent: boolean;
}

export function DeadlineCalendar({ deadlines }: UpcomingDeadlinesProps) {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    // Get days in current month
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    // Create calendar grid
    const calendarDays: CalendarDay[] = [];

    // Previous month padding
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
        calendarDays.push({
            date: new Date(currentYear, currentMonth - 1, prevMonthDays - i),
            isCurrentMonth: false,
            hasDeadline: false,
            isUrgent: false,
        });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(currentYear, currentMonth, i);
        const deadline = deadlines.find(d =>
            d.date.getDate() === i &&
            d.date.getMonth() === currentMonth
        );

        calendarDays.push({
            date,
            isCurrentMonth: true,
            hasDeadline: !!deadline,
            isUrgent: deadline ? differenceInDays(deadline.date, today) <= 7 : false,
        });
    }

    const weekDays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

    return (
        <div className="card">
            <h3 className="font-semibold text-gray-900 mb-5 pb-3 border-b border-gray-100">
                {format(today, 'MMMM yyyy')}
            </h3>

            <div className="grid grid-cols-7 gap-1.5">
                {/* Week day headers */}
                {weekDays.map(day => (
                    <div key={day} className="text-center text-xs font-medium text-gray-400 py-2">
                        {day}
                    </div>
                ))}

                {/* Calendar days */}
                {calendarDays.slice(0, 35).map((day, index) => (
                    <div
                        key={index}
                        className={`
              relative text-center py-2 text-sm rounded-lg
              ${day.isCurrentMonth ? 'text-gray-900' : 'text-gray-300'}
              ${day.date.toDateString() === today.toDateString() ? 'bg-blue-600 text-white font-bold' : ''}
              ${day.hasDeadline && !day.isUrgent ? 'bg-orange-100' : ''}
              ${day.hasDeadline && day.isUrgent ? 'bg-red-100' : ''}
            `}
                    >
                        {day.date.getDate()}
                        {day.hasDeadline && (
                            <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${day.isUrgent ? 'bg-red-500' : 'bg-orange-500'}`} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
