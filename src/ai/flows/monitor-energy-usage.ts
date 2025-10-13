export async function monitorEnergyUsage({ totalWeeklyUsage }: { totalWeeklyUsage: number }) {
    // Mock implementation - in a real app, this would call an AI service
    if (totalWeeklyUsage > 100) {
        return {
            isHighUsage: true,
            notification: `Your weekly energy usage is ${totalWeeklyUsage} kWh, which is higher than average. Consider turning off unused devices.`
        };
    }

    return {
        isHighUsage: false,
        notification: null
    };
}
