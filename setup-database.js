require('dotenv').config({ path: '.env.local' });

const { Client, Databases, ID } = require('appwrite');

const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const DATABASE_ID = 'HomeSyncDB';
const DEVICES_COLLECTION_ID = 'devices';
const ROUTINES_COLLECTION_ID = 'routines';
const SCHEDULES_COLLECTION_ID = 'schedules';

async function createDatabase() {
    try {
        console.log('Creating HomeSyncDB database...');

        // Create database
        const database = await databases.create(DATABASE_ID, 'HomeSyncDB');
        console.log('✅ Database created:', database.$id);

        // Create devices collection
        console.log('Creating devices collection...');
        const devicesCollection = await databases.createCollection(
            DATABASE_ID,
            DEVICES_COLLECTION_ID,
            'devices',
            [
                'users', // Allow users to read/write their own documents
            ],
            false, // Document-level permissions enabled
            true   // Enabled
        );
        console.log('✅ Devices collection created');

        // Add attributes to devices collection
        await databases.createStringAttribute(DATABASE_ID, DEVICES_COLLECTION_ID, 'name', 255, true);
        await databases.createStringAttribute(DATABASE_ID, DEVICES_COLLECTION_ID, 'room', 255, true);
        await databases.createStringAttribute(DATABASE_ID, DEVICES_COLLECTION_ID, 'type', 50, true);
        await databases.createStringAttribute(DATABASE_ID, DEVICES_COLLECTION_ID, 'status', 20, true);
        await databases.createIntegerAttribute(DATABASE_ID, DEVICES_COLLECTION_ID, 'value', false, 0, 100, 0);
        console.log('✅ Devices attributes created');

        // Create routines collection
        console.log('Creating routines collection...');
        const routinesCollection = await databases.createCollection(
            DATABASE_ID,
            ROUTINES_COLLECTION_ID,
            'routines',
            [
                'users',
            ],
            false, // Document-level permissions
            true   // Enabled
        );
        console.log('✅ Routines collection created');

        // Add attributes to routines collection
        await databases.createStringAttribute(DATABASE_ID, ROUTINES_COLLECTION_ID, 'name', 255, true);
        await databases.createStringAttribute(DATABASE_ID, ROUTINES_COLLECTION_ID, 'icon', 100, true);
        await databases.createStringAttribute(DATABASE_ID, ROUTINES_COLLECTION_ID, 'actions', 10000, true); // JSON string
        console.log('✅ Routines attributes created');

        // Create schedules collection
        console.log('Creating schedules collection...');
        const schedulesCollection = await databases.createCollection(
            DATABASE_ID,
            SCHEDULES_COLLECTION_ID,
            'schedules',
            [
                'users',
            ],
            false, // Document-level permissions
            true   // Enabled
        );
        console.log('✅ Schedules collection created');

        // Add attributes to schedules collection
        await databases.createStringAttribute(DATABASE_ID, SCHEDULES_COLLECTION_ID, 'name', 255, true);
        await databases.createStringAttribute(DATABASE_ID, SCHEDULES_COLLECTION_ID, 'deviceId', 50, true);
        await databases.createStringAttribute(DATABASE_ID, SCHEDULES_COLLECTION_ID, 'deviceName', 255, true);
        await databases.createStringAttribute(DATABASE_ID, SCHEDULES_COLLECTION_ID, 'time', 10, true);
        await databases.createStringAttribute(DATABASE_ID, SCHEDULES_COLLECTION_ID, 'action', 10, true);
        await databases.createStringAttribute(DATABASE_ID, SCHEDULES_COLLECTION_ID, 'days', 1000, true); // JSON array as string
        await databases.createBooleanAttribute(DATABASE_ID, SCHEDULES_COLLECTION_ID, 'enabled', true);
        console.log('✅ Schedules attributes created');

        console.log('\n🎉 HomeSyncDB database setup complete!');
        console.log('\nNext steps:');
        console.log('1. Enable Google OAuth2 provider in your Appwrite project settings');
        console.log('2. Update your .env.local with the correct project ID');
        console.log('3. Run: npm run dev');

    } catch (error) {
        console.error('❌ Error setting up database:', error.message);
        console.log('\nMake sure you have:');
        console.log('1. Set APPWRITE_API_KEY in your .env.local (get this from Appwrite Console > API Keys)');
        console.log('2. Set NEXT_PUBLIC_APPWRITE_PROJECT_ID in your .env.local');
        console.log('3. The API key has sufficient permissions to create databases and collections');
    }
}

createDatabase();
