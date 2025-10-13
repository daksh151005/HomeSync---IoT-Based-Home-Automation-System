import { databases, DATABASE_ID, DEVICES_COLLECTION_ID, ROUTINES_COLLECTION_ID, SCHEDULES_COLLECTION_ID, ID } from './appwrite';
import type { Device, Routine, Schedule } from './types';
import { Query } from 'appwrite';

// Device operations
export async function getUserDevices(userId: string): Promise<Device[]> {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            DEVICES_COLLECTION_ID,
            [Query.equal('$permissions', [`user:${userId}`])]
        );
        return response.documents.map(doc => ({
            id: doc.$id,
            name: doc.name,
            room: doc.room,
            type: doc.type,
            status: doc.status,
            value: doc.value,
        }));
    } catch (error) {
        console.error('Error fetching devices:', error);
        return [];
    }
}

export async function createDevice(userId: string, device: Omit<Device, 'id'>): Promise<Device | null> {
    try {
        const response = await databases.createDocument(
            DATABASE_ID,
            DEVICES_COLLECTION_ID,
            ID.unique(),
            device,
            [`user:${userId}`]
        );
        return {
            id: response.$id,
            name: response.name,
            room: response.room,
            type: response.type,
            status: response.status,
            value: response.value,
        };
    } catch (error) {
        console.error('Error creating device:', error);
        return null;
    }
}

export async function updateDevice(userId: string, deviceId: string, updates: Partial<Device>): Promise<boolean> {
    try {
        await databases.updateDocument(
            DATABASE_ID,
            DEVICES_COLLECTION_ID,
            deviceId,
            updates
        );
        return true;
    } catch (error) {
        console.error('Error updating device:', error);
        return false;
    }
}

export async function deleteDevice(userId: string, deviceId: string): Promise<boolean> {
    try {
        await databases.deleteDocument(
            DATABASE_ID,
            DEVICES_COLLECTION_ID,
            deviceId
        );
        return true;
    } catch (error) {
        console.error('Error deleting device:', error);
        return false;
    }
}

// Routine operations
export async function getUserRoutines(userId: string): Promise<Routine[]> {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            ROUTINES_COLLECTION_ID,
            [Query.equal('$permissions', [`user:${userId}`])]
        );
        return response.documents.map(doc => ({
            id: doc.$id,
            name: doc.name,
            icon: doc.icon,
            actions: JSON.parse(doc.actions),
        }));
    } catch (error) {
        console.error('Error fetching routines:', error);
        return [];
    }
}

export async function createRoutine(userId: string, routine: Omit<Routine, 'id'>): Promise<Routine | null> {
    try {
        const response = await databases.createDocument(
            DATABASE_ID,
            ROUTINES_COLLECTION_ID,
            ID.unique(),
            {
                name: routine.name,
                icon: routine.icon,
                actions: JSON.stringify(routine.actions),
            },
            [`user:${userId}`]
        );
        return {
            id: response.$id,
            name: response.name,
            icon: response.icon,
            actions: JSON.parse(response.actions),
        };
    } catch (error) {
        console.error('Error creating routine:', error);
        return null;
    }
}

export async function updateRoutine(userId: string, routineId: string, updates: Partial<Routine>): Promise<boolean> {
    try {
        const updateData: any = {};
        if (updates.name) updateData.name = updates.name;
        if (updates.icon) updateData.icon = updates.icon;
        if (updates.actions) updateData.actions = JSON.stringify(updates.actions);

        await databases.updateDocument(
            DATABASE_ID,
            ROUTINES_COLLECTION_ID,
            routineId,
            updateData
        );
        return true;
    } catch (error) {
        console.error('Error updating routine:', error);
        return false;
    }
}

export async function deleteRoutine(userId: string, routineId: string): Promise<boolean> {
    try {
        await databases.deleteDocument(
            DATABASE_ID,
            ROUTINES_COLLECTION_ID,
            routineId
        );
        return true;
    } catch (error) {
        console.error('Error deleting routine:', error);
        return false;
    }
}

// Schedule operations
export async function getUserSchedules(userId: string): Promise<Schedule[]> {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            SCHEDULES_COLLECTION_ID,
            [Query.equal('$permissions', [`user:${userId}`])]
        );
        return response.documents.map(doc => ({
            id: doc.$id,
            name: doc.name,
            deviceId: doc.deviceId,
            deviceName: doc.deviceName,
            time: doc.time,
            action: doc.action,
            days: doc.days,
            enabled: doc.enabled,
        }));
    } catch (error) {
        console.error('Error fetching schedules:', error);
        return [];
    }
}

export async function createSchedule(userId: string, schedule: Omit<Schedule, 'id'>): Promise<Schedule | null> {
    try {
        const response = await databases.createDocument(
            DATABASE_ID,
            SCHEDULES_COLLECTION_ID,
            ID.unique(),
            schedule,
            [`user:${userId}`]
        );
        return {
            id: response.$id,
            name: response.name,
            deviceId: response.deviceId,
            deviceName: response.deviceName,
            time: response.time,
            action: response.action,
            days: response.days,
            enabled: response.enabled,
        };
    } catch (error) {
        console.error('Error creating schedule:', error);
        return null;
    }
}

export async function updateSchedule(userId: string, scheduleId: string, updates: Partial<Schedule>): Promise<boolean> {
    try {
        await databases.updateDocument(
            DATABASE_ID,
            SCHEDULES_COLLECTION_ID,
            scheduleId,
            updates
        );
        return true;
    } catch (error) {
        console.error('Error updating schedule:', error);
        return false;
    }
}

export async function deleteSchedule(userId: string, scheduleId: string): Promise<boolean> {
    try {
        await databases.deleteDocument(
            DATABASE_ID,
            SCHEDULES_COLLECTION_ID,
            scheduleId
        );
        return true;
    } catch (error) {
        console.error('Error deleting schedule:', error);
        return false;
    }
}

// Initialize user data with default devices and routines
export async function initializeUserData(userId: string): Promise<void> {
    try {
        // Check if user already has devices
        const existingDevices = await getUserDevices(userId);
        if (existingDevices.length > 0) return;

        // Create default devices
        const defaultDevices = [
            { name: 'Living Room Lamp', room: 'Living Room', type: 'light' as const, status: 'on' as const, value: 80 },
            { name: 'Main Thermostat', room: 'Home', type: 'thermostat' as const, status: 'active' as const, value: 21 },
            { name: 'Bedroom Light', room: 'Bedroom', type: 'light' as const, status: 'off' as const, value: 100 },
            { name: 'Kitchen Outlet', room: 'Kitchen', type: 'socket' as const, status: 'on' as const },
            { name: 'Office Fan', room: 'Office', type: 'fan' as const, status: 'idle' as const },
            { name: 'Porch Light', room: 'Exterior', type: 'light' as const, status: 'off' as const, value: 60 },
            { name: 'TV Socket', room: 'Living Room', type: 'socket' as const, status: 'off' as const },
        ];

        for (const device of defaultDevices) {
            await createDevice(userId, device);
        }

        // Create default routines
        const defaultRoutines = [
            {
                name: 'Good Morning',
                icon: 'Sunrise',
                actions: [
                    { deviceId: 'bedroom-light', action: 'on' as const, value: 50 },
                    { deviceId: 'thermostat', action: 'on' as const, value: 22 },
                ],
            },
            {
                name: 'Good Night',
                icon: 'Bed',
                actions: [
                    { deviceId: 'living-room-lamp', action: 'off' as const },
                    { deviceId: 'bedroom-light', action: 'off' as const },
                    { deviceId: 'kitchen-outlet', action: 'off' as const },
                    { deviceId: 'porch-light', action: 'off' as const },
                    { deviceId: 'tv-socket', action: 'off' as const },
                    { deviceId: 'thermostat', action: 'on' as const, value: 19 },
                ],
            },
            {
                name: 'Movie Time',
                icon: 'Sparkles',
                actions: [
                    { deviceId: 'living-room-lamp', action: 'on' as const, value: 20 },
                    { deviceId: 'bedroom-light', action: 'off' as const },
                    { deviceId: 'tv-socket', action: 'on' as const },
                ],
            },
        ];

        for (const routine of defaultRoutines) {
            await createRoutine(userId, routine);
        }

        // Create default schedules
        const defaultSchedules = [
            {
                name: 'Weekday Wake-up',
                deviceId: 'bedroom-light',
                deviceName: 'Bedroom Light',
                time: '07:00',
                action: 'on' as const,
                days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                enabled: true,
            },
            {
                name: 'Evening Porch Light',
                deviceId: 'porch-light',
                deviceName: 'Porch Light',
                time: '18:30',
                action: 'on' as const,
                days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                enabled: true,
            },
            {
                name: 'Nighttime Thermostat',
                deviceId: 'thermostat',
                deviceName: 'Main Thermostat',
                time: '23:00',
                action: 'on' as const,
                days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                enabled: false,
            },
        ];

        for (const schedule of defaultSchedules) {
            await createSchedule(userId, schedule);
        }
    } catch (error) {
        console.error('Error initializing user data:', error);
    }
}
