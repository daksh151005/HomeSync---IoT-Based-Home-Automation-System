import type { LucideIcon } from "lucide-react";

export type DeviceType = "light" | "thermostat" | "switch" | "fan" | "socket";

export interface Device {
    id: string;
    name: string;
    room: string;
    type: DeviceType;
    status: "on" | "off" | "active" | "idle";
    value?: number; // For brightness or temperature
}

export interface Routine {
    id: string;
    name: string;
    icon: LucideIcon;
    actions: {
        deviceId: string;
        action: "on" | "off";
        value?: number;
    }[];
}

export interface EnergyUsage {
    day: string;
    usage: number; // in kWh
}

export interface Schedule {
    id: string;
    name: string;
    deviceId: string;
    deviceName: string;
    time: string;
    action: 'on' | 'off';
    days: ('Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun')[];
    enabled: boolean;
}
