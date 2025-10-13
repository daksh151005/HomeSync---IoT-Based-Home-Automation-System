'use client';

import { useState } from 'react';
import { Lightbulb, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';
import { getRoutineSuggestions } from '@/app/actions';
import type { Device } from '@/lib/types';
import { Separator } from './ui/separator';

export function RoutineSuggestion({ devices }: { devices: Device[] }) {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleGenerate = async () => {
        setIsLoading(true);
        setSuggestions([]);

        const deviceList = devices.map(d => `${d.name} in ${d.room}`).join(', ');
        const usagePatterns = `
- The Living Room Lamp is often on in the evenings.
- The Bedroom Light is turned on around 7 AM and off around 11 PM.
- The thermostat is usually set to 22°C during the day and 19°C at night.
- The Porch Light is manually turned on after sunset.
- The Kitchen Outlet (connected to a coffee maker) is turned on every weekday morning.
    `;

        const result = await getRoutineSuggestions(deviceList, usagePatterns);
        if (result.success && result.suggestions) {
            setSuggestions(result.suggestions);
        } else {
            setSuggestions(['Sorry, I couldn\'t come up with any suggestions right now.']);
        }

        setIsLoading(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Smart Suggestions
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Smart Routine Suggestions</DialogTitle>
                    <DialogDescription>
                        Let AI suggest new routines based on your device usage patterns.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-24">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : suggestions.length > 0 ? (
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">Here are a few ideas for you:</p>
                            <ul className="space-y-2 list-disc list-inside bg-secondary/50 p-4 rounded-md">
                                {suggestions.map((s, i) => (
                                    <li key={i}>{s}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p className="text-sm text-center text-muted-foreground">Click "Generate" to get started.</p>
                    )}
                </div>
                <Separator />
                <DialogFooter>
                    <Button onClick={handleGenerate} disabled={isLoading}>
                        {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Thinking...</> : 'Generate New Suggestions'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
