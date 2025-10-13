import { Client, Account, Databases, ID } from 'appwrite';

const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const databases = new Databases(client);

export const DATABASE_ID = 'HomeSyncDB';
export const DEVICES_COLLECTION_ID = 'devices';
export const ROUTINES_COLLECTION_ID = 'routines';
export const SCHEDULES_COLLECTION_ID = 'schedules';

export { ID };
