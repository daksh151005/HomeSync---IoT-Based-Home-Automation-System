'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import type { EnergyUsage } from '@/lib/types';

interface EnergyUsageChartProps {
    data: EnergyUsage[];
}

export function EnergyUsageChart({ data }: EnergyUsageChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Weekly Energy Consumption</CardTitle>
                <CardDescription>Total kWh used per day over the last week.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                            <XAxis
                                dataKey="day"
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                            />
                            <YAxis
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                                tickFormatter={(value) => `${value} kWh`}
                            />
                            <Tooltip
                                cursor={{ fill: 'hsl(var(--accent))', radius: 4 }}
                                content={({ active, payload, label }) => {
                                    if (active && payload && payload.length) {
                                        return (
                                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="flex flex-col space-y-1">
                                                        <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
                                                        <span className="font-bold text-foreground">
                                                            {payload[0].value} kWh
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                    return null;
                                }}
                            />
                            <Bar dataKey="usage" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
