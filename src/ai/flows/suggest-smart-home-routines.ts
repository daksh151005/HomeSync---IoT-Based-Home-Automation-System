export async function suggestSmartHomeRoutines({ deviceList, usagePatterns }: { deviceList: string, usagePatterns: string }) {
    // Mock implementation - in a real app, this would call an AI service
    return {
        suggestedRoutines: [
            "Turn off all lights when leaving home",
            "Set thermostat to 19°C at night",
            "Turn on porch light at sunset",
            "Coffee maker on at 7 AM weekdays"
        ]
    };
}
