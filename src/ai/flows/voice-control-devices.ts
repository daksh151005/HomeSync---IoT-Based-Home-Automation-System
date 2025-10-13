export async function voiceControlDevices({ command, devices }: { command: string, devices: any[] }) {
    // Mock implementation - in a real app, this would call an AI service
    const lowerCommand = command.toLowerCase();

    let action: string | null = null;
    let deviceName: string | null = null;

    // Determine action
    if (lowerCommand.includes('turn on') || lowerCommand.includes('turnon')) {
        action = 'turnon';
    } else if (lowerCommand.includes('turn off') || lowerCommand.includes('turnoff')) {
        action = 'turnoff';
    } else if (lowerCommand.includes('set')) {
        action = 'set';
    }

    if (!action) {
        return {
            success: false,
            feedback: "I didn't understand that command. Try saying 'turn on living room light' or 'turn off thermostat'."
        };
    }

    // Extract device name by removing action keywords
    let cleanedCommand = lowerCommand
        .replace(/turn on|turn off|turnon|turnoff|set/g, '')
        .replace(/to \d+/g, '') // remove "to 22" for thermostat
        .trim();

    // Find the best matching device
    let bestMatch = null;
    let bestScore = 0;

    for (const device of devices) {
        const deviceNameLower = device.name.toLowerCase();
        const words = cleanedCommand.split(' ');
        let score = 0;

        for (const word of words) {
            if (deviceNameLower.includes(word)) {
                score += 1;
            }
        }

        // Bonus for exact matches or close matches
        if (deviceNameLower === cleanedCommand) {
            score += 10;
        } else if (cleanedCommand.includes(deviceNameLower)) {
            score += 5;
        }

        if (score > bestScore) {
            bestScore = score;
            bestMatch = device;
        }
    }

    if (bestMatch && bestScore > 0) {
        const feedback = action === 'turnon' ? `Turning on ${bestMatch.name}` :
            action === 'turnoff' ? `Turning off ${bestMatch.name}` :
                `Setting ${bestMatch.name}`;

        return {
            success: true,
            device: bestMatch.name,
            action,
            feedback
        };
    }

    return {
        success: false,
        feedback: "I couldn't find that device. Try saying 'turn on living room lamp' or 'turn off thermostat'."
    };
}
