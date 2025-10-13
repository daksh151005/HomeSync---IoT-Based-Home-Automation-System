'use client';

import { useState } from 'react';
import { Zap, Loader2, PowerOff } from 'lucide-react';
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
import { detectForgottenAppliances } from '@/app/actions';
import type { Device } from '@/lib/types';
import { Separator } from './ui/separator';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

type ForgottenDevice = {
    deviceId: string;
    deviceName: string;
    reason: string;
};

interface ForgottenAppliancesDetectorProps {
    devices: Device[];
    onTurnOffDevices: (deviceIds: string[]) => void;
}

export function ForgottenAppliancesDetector({ devices, onTurnOffDevices }: ForgottenAppliancesDetectorProps) {
    const [forgotten, setForgotten] = useState<ForgottenDevice[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleDetection = async () => {
        setIsLoading(true);
        setForgotten([]);

        const routine = "The user leaves for the office at 9 AM and returns at 6 PM on weekdays. They are usually home on weekends.";
        const deviceStatus = devices.map(d => ({ id: d.id, name: d.name, status: d.status }));

        const result = await detectForgottenAppliances(deviceStatus, routine);

        if (result.success && result.forgottenDevices) {
            setForgotten(result.forgottenDevices);
        } else {
            // Handle case where detection fails or returns nothing
        }

        setIsLoading(false);
    };

    const handleTurnOff = () => {
        const deviceIds = forgotten.map(d => d.deviceId);
        onTurnOffDevices(deviceIds);
        setIsOpen(false);
    }

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open);
        if (open) {
            handleDetection();
        } else {
            // Reset state when closing
            setForgotten([]);
            setIsLoading(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Zap className="mr-2 h-4 w-4" />
                    Check Forgotten Devices
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Forgotten Device Check</DialogTitle>
                    <DialogDescription>
                        AI is checking if you've left any appliances on based on your typical routine.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-24">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : forgotten.length > 0 ? (
                        <div className="space-y-4">
                            <Alert variant="destructive">
                                <AlertTitle>Potential Savings Opportunity!</AlertTitle>
                                <AlertDescription>
                                    The following devices are on and could be turned off to save energy:
                                </AlertDescription>
                            </Alert>
                            <ul className="space-y-3 rounded-md border p-4">
                                {forgotten.map((d) => (
                                    <li key={d.deviceId} className="flex flex-col">
                                        <span className="font-semibold">{d.deviceName}</span>
                                        <span className="text-sm text-muted-foreground">{d.reason}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <Alert>
                            <AlertTitle>All Good!</AlertTitle>
                            <AlertDescription>
                                It looks like all your appliances are in the correct state based on your routine.
                            </AlertDescription>
                        </Alert>
                    )}
                </div>
                <DialogFooter className="sm:justify-between gap-2">
                    {forgotten.length > 0 && !isLoading && (
                        <Button onClick={handleTurnOff}>
                            <PowerOff className="mr-2 h-4 w-4" />
                            Turn Them Off
                        </Button>
                    )}
                    <Button variant="secondary" onClick={() => handleOpenChange(false)}>Close</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
