'use client';

import { Play } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Routine } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface RoutineCardProps {
    routine: Routine;
    onExecute: (routine: Routine) => void;
}

export function RoutineCard({ routine, onExecute }: RoutineCardProps) {
    const { toast } = useToast();
    const Icon = routine.icon;

    const handleExecute = () => {
        onExecute(routine);
        toast({
            title: `Routine executed: ${routine.name}`,
            description: "Your devices have been updated.",
        });
    };

    return (
        <Card className="flex flex-col justify-between">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{routine.name}</CardTitle>
                <Icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <Button onClick={handleExecute} className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Run Routine
                </Button>
            </CardContent>
        </Card>
    );
}
