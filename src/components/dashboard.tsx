'use client';

import { useState, useEffect } from 'react';
import { devices as initialDevices, routines as initialRoutines, energyUsage as initialEnergyUsage, schedules as initialSchedules } from '@/lib/data';
import type { Device, Routine, EnergyUsage, Schedule } from '@/lib/types';
import { DeviceCard } from './device-card';
import { RoutineCard } from './routine-card';

import { RoutineSuggestion } from './routine-suggestion';
import { Separator } from './ui/separator';
import { HeroSection } from './hero-section';
import { EnergyUsageChart } from './energy-usage-chart';
import { ScheduleCard } from './schedule-card';
import { useToast } from '@/hooks/use-toast';
import { checkForHighEnergyUsage } from '@/app/actions';
import { ForgottenAppliancesDetector } from './forgotten-appliances-detector';
import { Button } from './ui/button';
import { PlusCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { ScheduleForm } from './schedule-form';
import { ThemeToggle } from './theme-toggle';

export function Dashboard() {
    const [devices, setDevices] = useState<Device[]>(initialDevices);
    const [routines] = useState<Routine[]>(initialRoutines);
    const [energyUsage] = useState<EnergyUsage[]>(initialEnergyUsage);
    const [schedules, setSchedules] = useState<Schedule[]>(initialSchedules);
    const { toast } = useToast();
    const [isScheduleFormOpen, setIsScheduleFormOpen] = useState(false);
    const [editingSchedule, setEditingSchedule] = useState<Schedule | null>(null);

    useEffect(() => {
        const totalWeeklyUsage = energyUsage.reduce((acc, day) => acc + day.usage, 0);

        const checkUsage = async () => {
            const result = await checkForHighEnergyUsage(totalWeeklyUsage);
            if (result.isHigh && result.notification) {
                toast({
                    title: 'Energy Alert',
                    description: result.notification,
                    variant: 'destructive',
                    duration: 9000,
                });
            }
        };

        checkUsage();
    }, [energyUsage, toast]);


    const handleDeviceToggle = (deviceId: string, status: Device['status']) => {
        setDevices(prevDevices =>
            prevDevices.map(device =>
                device.id === deviceId ? { ...device, status } : device
            )
        );
    };

    const handleDeviceValueChange = (deviceId: string, value: number) => {
        setDevices(prevDevices =>
            prevDevices.map(device =>
                device.id === deviceId ? { ...device, value } : device
            )
        );
    };

    const handleRoutineExecution = (routine: Routine) => {
        setDevices(prevDevices => {
            const newDevices = [...prevDevices];
            routine.actions.forEach(action => {
                const deviceIndex = newDevices.findIndex(d => d.id === action.deviceId);
                if (deviceIndex !== -1) {
                    const newStatus = action.action === 'on' ? (newDevices[deviceIndex].type === 'fan' ? 'active' : 'on') : (newDevices[deviceIndex].type === 'fan' ? 'idle' : 'off');
                    newDevices[deviceIndex] = {
                        ...newDevices[deviceIndex],
                        status: newStatus
                    };
                    if (action.value !== undefined) {
                        newDevices[deviceIndex].value = action.value;
                    }
                }
            });
            return newDevices;
        });
    };



    const handleScheduleToggle = (scheduleId: string, enabled: boolean) => {
        setSchedules(prevSchedules =>
            prevSchedules.map(schedule =>
                schedule.id === scheduleId ? { ...schedule, enabled } : schedule
            )
        );
    };

    const handleEditSchedule = (schedule: Schedule) => {
        setEditingSchedule(schedule);
        setIsScheduleFormOpen(true);
    };

    const handleSaveSchedule = (schedule: Omit<Schedule, 'id'> & { id?: string }) => {
        if (schedule.id) {
            setSchedules(schedules.map(s => s.id === schedule.id ? schedule as Schedule : s));
            toast({ title: 'Schedule Updated', description: `"${schedule.name}" has been updated.` });
        } else {
            const newSchedule = { ...schedule, id: `s${Date.now()}` } as Schedule;
            setSchedules([...schedules, newSchedule]);
            toast({ title: 'Schedule Created', description: `"${schedule.name}" has been added.` });
        }
        setIsScheduleFormOpen(false);
        setEditingSchedule(null);
    };

    const handleDeleteSchedule = (scheduleId: string) => {
        setSchedules(schedules.filter(s => s.id !== scheduleId));
        toast({ title: 'Schedule Deleted', variant: 'destructive' });
        setIsScheduleFormOpen(false);
        setEditingSchedule(null);
    };

    const turnOffDevices = (deviceIds: string[]) => {
        setDevices(prevDevices =>
            prevDevices.map(device => {
                if (deviceIds.includes(device.id)) {
                    const newStatus = device.type === 'fan' ? 'idle' : 'off';
                    return { ...device, status: newStatus };
                }
                return device;
            })
        );
        toast({
            title: "Devices Turned Off",
            description: "The selected devices have been turned off to save energy."
        });
    };


    return (
        <div className="flex flex-col min-h-screen">
            <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <h1 className="text-2xl font-bold text-primary">HomeSync</h1>
                        <div className="flex items-center gap-2">
                            <ForgottenAppliancesDetector devices={devices} onTurnOffDevices={turnOffDevices} />
                            <RoutineSuggestion devices={devices} />
                            <ThemeToggle />
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex-1 container mx-auto p-4 sm:p-6 lg:p-8">
                <HeroSection />

                <section className="mt-8">
                    <h2 className="text-xl font-semibold tracking-tight mb-4">Devices</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {devices.map(device => (
                            <DeviceCard
                                key={device.id}
                                device={device}
                                onToggle={handleDeviceToggle}
                                onValueChange={handleDeviceValueChange}
                            />
                        ))}
                    </div>
                </section>

                <Separator className="my-8" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <section>
                        <h2 className="text-xl font-semibold tracking-tight mb-4">Energy Usage</h2>
                        <EnergyUsageChart data={energyUsage} />
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold tracking-tight mb-4">Routines</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {routines.map(routine => (
                                <RoutineCard key={routine.id} routine={routine} onExecute={handleRoutineExecution} />
                            ))}
                        </div>
                    </section>
                </div>

                <Separator className="my-8" />

                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold tracking-tight">Smart Schedules</h2>
                        <Dialog open={isScheduleFormOpen} onOpenChange={(isOpen) => {
                            setIsScheduleFormOpen(isOpen);
                            if (!isOpen) setEditingSchedule(null);
                        }}>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setEditingSchedule(null)}>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    Add Schedule
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{editingSchedule ? 'Edit Schedule' : 'Create New Schedule'}</DialogTitle>
                                </DialogHeader>
                                <ScheduleForm
                                    schedule={editingSchedule}
                                    devices={devices}
                                    onSave={(data) => handleSaveSchedule({ ...data, enabled: editingSchedule?.enabled ?? true })}
                                    onDelete={handleDeleteSchedule}
                                />
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {schedules.map(schedule => (
                            <ScheduleCard key={schedule.id} schedule={schedule} onToggle={handleScheduleToggle} onEdit={() => handleEditSchedule(schedule)} />
                        ))}
                    </div>
                </section>
            </main>
            <footer className="sticky bottom-0 z-10 bg-background/80 backdrop-blur-sm border-t">
                {/* Voice command functionality removed */}
            </footer>
        </div>
    );
}
