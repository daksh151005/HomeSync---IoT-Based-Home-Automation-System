'use client';

import React from 'react';
import { Lightbulb, Thermometer, Plug, Fan, LucideIcon, Tv } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import type { Device, DeviceType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Label } from './ui/label';

const deviceIcons: Record<DeviceType, LucideIcon> = {
    light: Lightbulb,
    thermostat: Thermometer,
    switch: Plug,
    fan: Fan,
    socket: Plug,
};

interface DeviceCardProps {
    device: Device;
    onToggle: (deviceId: string, status: Device['status']) => void;
    onValueChange: (deviceId: string, value: number) => void;
}

function DeviceCardComponent({ device, onToggle, onValueChange }: DeviceCardProps) {
    const Icon = device.type === 'socket' && device.name.toLowerCase().includes('tv') ? Tv : deviceIcons[device.type];
    const isOn = device.status === 'on' || device.status === 'active';

    const handleToggle = (checked: boolean) => {
        let newStatus: Device['status'];
        if (device.type === 'fan') {
            newStatus = checked ? 'active' : 'idle';
        } else {
            newStatus = checked ? 'on' : 'off';
        }
        // Prevent unnecessary re-renders by checking if status actually changed
        if (device.status !== newStatus) {
            onToggle(device.id, newStatus);
        }
    };

    const handleValueChange = (newValue: number[]) => {
        // Prevent unnecessary re-renders by checking if value actually changed
        if (device.value !== newValue[0]) {
            onValueChange(device.id, newValue[0]);
        }
    };

    const getStatusText = () => {
        if (device.type === 'thermostat' && isOn) return `${device.value}°C`;
        if (device.type === 'light' && isOn) return `${device.value}%`;
        return device.status.charAt(0).toUpperCase() + device.status.slice(1);
    };

    return (
        <Card className={cn(
            "transition-all duration-300",
            isOn ? "border-primary/50 bg-primary/5" : "border-border"
        )}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{device.name}</CardTitle>
                <Icon className={cn("h-5 w-5 text-muted-foreground transition-colors", isOn && "text-primary")} />
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between space-x-4">
                    <div className="text-2xl font-bold">{getStatusText()}</div>
                    <Switch checked={isOn} onCheckedChange={handleToggle} aria-label={`Toggle ${device.name}`} />
                </div>
                <p className="text-xs text-muted-foreground pt-1">{device.room}</p>

                {(device.type === 'light' || device.type === 'thermostat') && (
                    <div className="mt-4 pt-4 border-t">
                        <Label className="text-xs text-muted-foreground">
                            {device.type === 'light' ? 'Brightness' : 'Temperature'}
                        </Label>
                        <Slider
                            disabled={!isOn}
                            value={[device.value || 0]}
                            onValueChange={handleValueChange}
                            max={device.type === 'light' ? 100 : 30}
                            min={device.type === 'light' ? 0 : 15}
                            step={1}
                            className="mt-2"
                        />
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export const DeviceCard = React.memo(DeviceCardComponent);
