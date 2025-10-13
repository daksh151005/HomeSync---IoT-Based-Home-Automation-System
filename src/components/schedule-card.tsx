'use client';

import { Calendar, Clock, Power, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import type { Schedule } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface ScheduleCardProps {
    schedule: Schedule;
    onToggle: (scheduleId: string, enabled: boolean) => void;
    onEdit: (schedule: Schedule) => void;
}

export function ScheduleCard({ schedule, onToggle, onEdit }: ScheduleCardProps) {
    const { name, deviceName, time, action, days, enabled } = schedule;

    const handleToggle = (checked: boolean) => {
        onToggle(schedule.id, checked);
    };

    const dayBadges = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
        <span
            key={day}
            className={cn(
                'text-center text-xs w-6 h-6 flex items-center justify-center rounded-full',
                days.includes(day as any)
                    ? 'bg-primary/20 text-primary-foreground font-semibold'
                    : 'bg-muted text-muted-foreground'
            )}
        >
            {day.charAt(0)}
        </span>
    ));

    return (
        <Card className={cn("flex flex-col transition-all duration-300", enabled ? "border-primary/50 bg-primary/5" : "border-border opacity-70")}>
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                    <div>
                        <CardTitle className="text-base font-semibold">{name}</CardTitle>
                        <CardDescription className="text-xs">{deviceName}</CardDescription>
                    </div>
                    <Switch checked={enabled} onCheckedChange={handleToggle} aria-label={`Toggle ${name} schedule`} />
                </div>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-mono">{time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                        <Power className="h-4 w-4 text-muted-foreground" />
                        <span>Action: <Badge variant={action === 'on' ? 'default' : 'secondary'} className="capitalize">{action}</Badge></span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <div className="flex space-x-1">{dayBadges}</div>
                    </div>
                </div>
                <Button variant="ghost" size="sm" className="w-full justify-center mt-2" onClick={() => onEdit(schedule)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
            </CardContent>
        </Card>
    );
}
