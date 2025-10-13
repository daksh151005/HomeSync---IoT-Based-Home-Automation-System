import { Sunrise, Bed, Sparkles } from 'lucide-react';
import type { Device, Routine, EnergyUsage, Schedule } from './types';

export const devices: Device[] = [
    { id: '1', name: 'Living Room Lamp', room: 'Living Room', type: 'light', status: 'on', value: 80 },
    { id: '2', name: 'Main Thermostat', room: 'Home', type: 'thermostat', status: 'active', value: 21 },
    { id: '3', name: 'Bedroom Light', room: 'Bedroom', type: 'light', status: 'off', value: 100 },
    { id: '4', name: 'Kitchen Outlet', room: 'Kitchen', type: 'socket', status: 'on' },
    { id: '5', name: 'Office Fan', room: 'Office', type: 'fan', status: 'idle' },
    { id: '6', name: 'Porch Light', room: 'Exterior', type: 'light', status: 'off', value: 60 },
    { id: '7', name: 'TV Socket', room: 'Living Room', type: 'socket', status: 'off' },
];

export const routines: Routine[] = [
    {
        id: 'r1',
        name: 'Good Morning',
        icon: Sunrise,
        actions: [
            { deviceId: '3', action: 'on', value: 50 },
            { deviceId: '2', action: 'on', value: 22 },
        ],
    },
    {
        id: 'r2',
        name: 'Good Night',
        icon: Bed,
        actions: [
            { deviceId: '1', action: 'off' },
            { deviceId: '3', action: 'off' },
            { deviceId: '4', action: 'off' },
            { deviceId: '6', action: 'off' },
            { deviceId: '7', action: 'off' },
            { deviceId: '2', action: 'on', value: 19 },
        ],
    },
    {
        id: 'r3',
        name: 'Movie Time',
        icon: Sparkles,
        actions: [
            { deviceId: '1', action: 'on', value: 20 },
            { deviceId: '3', action: 'off' },
            { deviceId: '7', action: 'on' },
        ],
    },
];

export const energyUsage: EnergyUsage[] = [
    { day: 'Mon', usage: 12 },
    { day: 'Tue', usage: 15 },
    { day: 'Wed', usage: 11 },
    { day: 'Thu', usage: 17 },
    { day: 'Fri', usage: 18 },
    { day: 'Sat', usage: 22 },
    { day: 'Sun', usage: 20 },
];

export const schedules: Schedule[] = [
    {
        id: 's1',
        name: 'Weekday Wake-up',
        deviceId: '3',
        deviceName: 'Bedroom Light',
        time: '07:00',
        action: 'on',
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        enabled: true,
    },
    {
        id: 's2',
        name: 'Evening Porch Light',
        deviceId: '6',
        deviceName: 'Porch Light',
        time: '18:30',
        action: 'on',
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        enabled: true,
    },
    {
        id: 's3',
        name: 'Nighttime Thermostat',
        deviceId: '2',
        deviceName: 'Main Thermostat',
        time: '23:00',
        action: 'on',
        days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        enabled: false,
    },
];
