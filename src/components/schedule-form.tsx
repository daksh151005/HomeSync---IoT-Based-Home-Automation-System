'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { Device, Schedule } from '@/lib/types';
import { Trash } from 'lucide-react';

const scheduleSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters.'),
    deviceId: z.string().min(1, 'Please select a device.'),
    time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM).'),
    action: z.enum(['on', 'off']),
    days: z.array(z.string()).min(1, 'Please select at least one day.'),
});

type ScheduleFormValues = z.infer<typeof scheduleSchema>;

interface ScheduleFormProps {
    schedule: Schedule | null;
    devices: Device[];
    onSave: (data: Omit<Schedule, 'id' | 'enabled'> & { id?: string, deviceName: string }) => void;
    onDelete?: (scheduleId: string) => void;
}

const ALL_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function ScheduleForm({ schedule, devices, onSave, onDelete }: ScheduleFormProps) {
    const form = useForm<ScheduleFormValues>({
        resolver: zodResolver(scheduleSchema),
        defaultValues: {
            name: schedule?.name || '',
            deviceId: schedule?.deviceId || '',
            time: schedule?.time || '',
            action: schedule?.action || 'on',
            days: schedule?.days || [],
        },
    });

    function onSubmit(data: ScheduleFormValues) {
        const selectedDevice = devices.find(d => d.id === data.deviceId);
        if (!selectedDevice) return;

        onSave({
            id: schedule?.id,
            deviceName: selectedDevice.name,
            ...data
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Schedule Name</FormLabel>
                            <FormControl>
                                <Input placeholder="e.g., Weekday Morning Lights" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="deviceId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Device</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a device to control" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {devices.map(device => (
                                        <SelectItem key={device.id} value={device.id}>{device.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="time"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Time (24h)</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="action"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Action</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        className="flex items-center space-x-2 pt-2"
                                    >
                                        <FormItem className="flex items-center space-x-2 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="on" />
                                            </FormControl>
                                            <FormLabel className="font-normal">On</FormLabel>
                                        </FormItem>
                                        <FormItem className="flex items-center space-x-2 space-y-0">
                                            <FormControl>
                                                <RadioGroupItem value="off" />
                                            </FormControl>
                                            <FormLabel className="font-normal">Off</FormLabel>
                                        </FormItem>
                                    </RadioGroup>
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="days"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Repeat on Days</FormLabel>
                            <FormControl>
                                <ToggleGroup
                                    type="multiple"
                                    variant="outline"
                                    value={field.value}
                                    onValueChange={field.onChange}
                                    className="flex-wrap justify-start"
                                >
                                    {ALL_DAYS.map(day => (
                                        <ToggleGroupItem key={day} value={day} aria-label={`Toggle ${day}`}>
                                            {day}
                                        </ToggleGroupItem>
                                    ))}
                                </ToggleGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-between items-center pt-4">
                    <Button type="submit">Save Schedule</Button>
                    {schedule && onDelete && (
                        <Button type="button" variant="destructive" size="icon" onClick={() => onDelete(schedule.id)}>
                            <Trash className="h-4 w-4" />
                            <span className="sr-only">Delete schedule</span>
                        </Button>
                    )}
                </div>
            </form>
        </Form>
    );
}
