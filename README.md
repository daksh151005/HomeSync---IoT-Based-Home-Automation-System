# HomeSync - IoT Based Home Automation System

A modern, intelligent smart home automation application built with Next.js, TypeScript, and Tailwind CSS. Control your IoT devices, manage routines, monitor energy usage, and receive AI-powered suggestions for optimal home automation.

## Features

### Core Functionality
- Device Control: Toggle lights, thermostats, fans, and outlets with intuitive controls
- Smart Routines: Pre-configured automation routines (Good Morning, Good Night, Movie Time)
- Energy Monitoring: Real-time energy usage tracking with AI-powered alerts
- Smart Schedules: Automated device control based on time and day schedules
- AI-Powered Suggestions: Intelligent routine recommendations based on usage patterns
- Forgotten Appliance Detection: AI detects and alerts about devices left running

### User Experience
- Dark/Light Theme Toggle: Seamless theme switching with system preference support
- Responsive Design: Optimized for desktop, tablet, and mobile devices
- Real-time Updates: Instant feedback on device status changes
- Toast Notifications: User-friendly alerts and confirmations

### Technical Features
- TypeScript: Full type safety throughout the application
- Server Actions: Secure server-side processing for AI flows
- Component Architecture: Modular, reusable React components
- Accessibility: WCAG compliant UI components

## Tech Stack

- Frontend: Next.js 15, React 18, TypeScript
- Styling: Tailwind CSS, Radix UI components
- Icons: Lucide React
- Charts: Recharts
- Forms: React Hook Form with Zod validation
- AI Integration: Custom AI flows for device control and suggestions
- Backend Ready: Appwrite integration for database and authentication

## Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Appwrite account (for database functionality)

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/daksh151005/HomeSync---IoT-Based-Home-Automation-System.git
   cd HomeSync---IoT-Based-Home-Automation-System
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_appwrite_project_id
   ```

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. Open your browser
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
iot-home-automation/
├── src/
│   ├── ai/flows/          # AI-powered automation flows
│   ├── app/               # Next.js app router pages and actions
│   ├── components/        # Reusable React components
│   │   ├── ui/           # Shadcn/ui components
│   │   └── ...           # Feature-specific components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities and configurations
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
└── ...config files
```

## Configuration

### Appwrite Setup
1. Create an Appwrite project
2. Set up the following collections:
   - `devices`: Store device information
   - `routines`: Store automation routines
   - `schedules`: Store scheduled actions
3. Configure your environment variables with the project details

### Database Schema
The application expects the following data structure:
- Devices: id, name, room, type, status, value
- Routines: id, name, icon, actions
- Schedules: id, name, deviceId, deviceName, time, action, days, enabled

## Usage

### Device Control
- Click device cards to toggle on/off
- Adjust sliders for dimmable lights and thermostats
- View real-time status updates

### Creating Routines
- Use the "Smart Suggestions" button for AI recommendations
- Execute routines with one click

### Managing Schedules
- Add new schedules with the "Add Schedule" button
- Configure time, days, and actions
- Toggle schedules on/off as needed

### Energy Monitoring
- View weekly energy usage charts
- Receive alerts for high consumption
- Get suggestions to reduce usage

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI components from [Shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
- Charts powered by [Recharts](https://recharts.org)

## Support

For questions or support, please open an issue on the GitHub repository.
