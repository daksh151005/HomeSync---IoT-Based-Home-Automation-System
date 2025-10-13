export async function detectForgottenAppliances({ devices, routineDescription }: { devices: any[], routineDescription: string }) {
    // Mock implementation - in a real app, this would call an AI service
    const forgottenDevices = devices
        .filter(device => device.status === 'on' || device.status === 'active')
        .map(device => ({
            deviceId: device.id,
            deviceName: device.name,
            reason: "This device is currently on but based on your routine, it should be off."
        }));

    return {
        forgottenDevices
    };
}
