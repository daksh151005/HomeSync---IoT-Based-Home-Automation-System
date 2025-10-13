'use server';

import { suggestSmartHomeRoutines } from '@/ai/flows/suggest-smart-home-routines';
import { voiceControlDevices } from '@/ai/flows/voice-control-devices';
import { monitorEnergyUsage } from '@/ai/flows/monitor-energy-usage';
import { detectForgottenAppliances as detectForgottenAppliancesFlow } from '@/ai/flows/detect-forgotten-appliances';
import { z } from 'zod';
import { devices as allDevices } from '@/lib/data';
import type { Device } from '@/lib/types';



export async function getRoutineSuggestions(devices: string, usagePatterns: string) {
    try {
        const result = await suggestSmartHomeRoutines({
            deviceList: devices,
            usagePatterns: usagePatterns,
        });
        return { success: true, suggestions: result.suggestedRoutines };
    } catch (error) {
        console.error(error);
        return { success: false, suggestions: ['Failed to get suggestions. Please try again later.'] };
    }
}

export async function checkForHighEnergyUsage(totalWeeklyUsage: number) {
    try {
        const result = await monitorEnergyUsage({ totalWeeklyUsage });
        if (result.isHighUsage) {
            return { isHigh: true, notification: result.notification };
        }
        return { isHigh: false, notification: null };
    } catch (error) {
        console.error('Error checking energy usage:', error);
        return { isHigh: false, notification: null };
    }
}

export async function detectForgottenAppliances(devices: Pick<Device, 'id' | 'name' | 'status'>[], routine: string) {
    try {
        const result = await detectForgottenAppliancesFlow({
            devices,
            routineDescription: routine,
        });
        return { success: true, forgottenDevices: result.forgottenDevices };
    } catch (error) {
        console.error('Error detecting forgotten appliances:', error);
        return { success: false, forgottenDevices: [] };
    }
}
